FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN npx prisma generate

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public


ARG STRAVA_CLIENT_ID
ENV STRAVA_CLIENT_ID=${STRAVA_CLIENT_ID}

ARG STRAVA_SECRET
ENV STRAVA_SECRET=${STRAVA_SECRET}

ARG WEATHERAPI_TOKEN
ENV WEATHERAPI_TOKEN=${WEATHERAPI_TOKEN}

ARG SPOTIFY_CLIENT_ID
ENV SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}

ARG SPOTIFY_CLIENT_SECRET
ENV SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET}

ARG FINNHUB_SECRET
ENV FINNHUB_SECRET=${FINNHUB_SECRET}

ARG TWITTER_CLIENT_ID
ENV TWITTER_CLIENT_ID=${TWITTER_CLIENT_ID}

ARG TWITTER_CLIENT_SECRET
ENV TWITTER_CLIENT_SECRET=${TWITTER_CLIENT_SECRET}

ARG TWITTER_CODE_CHALLENGE_KEY
ENV TWITTER_CODE_CHALLENGE_KEY=${TWITTER_CODE_CHALLENGE_KEY}

ARG TOKEN_ENCRYPT_KEY
ENV TOKEN_ENCRYPT_KEY=${TOKEN_ENCRYPT_KEY}

ARG OUTLOOK_CLIENT_ID
ENV OUTLOOK_CLIENT_ID=${OUTLOOK_CLIENT_ID}

ARG OUTLOOK_CLIENT_SECRET
ENV OUTLOOK_CLIENT_SECRET=${OUTLOOK_CLIENT_SECRET}

ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}

ARG GOOGLE_CLIENT_SECRET
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG DATABASE_URL_UNPOOLED
ENV DATABASE_URL_UNPOOLED=${DATABASE_URL_UNPOOLED}

ARG ANALYTICS_ENABLED
ENV ANALYTICS_ENABLED=${ANALYTICS_ENABLED}

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]