# Stage 1: Build
FROM oven/bun:slim as builder
WORKDIR /app

# Set node environment for production
ENV NODE_ENV=production

# Copy all files and install dependencies
COPY . .
RUN bun install --lockfile && \
    bun run build && \
    mv /app/.next/static /app/.next/standalone/.next/static && \
    mv /app/public /app/.next/standalone/public 

# Stage 2: Final
FROM oven/bun:slim
WORKDIR /app

# Set node environment for production
ENV NODE_ENV=production

# Copy necessary files from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY .env.local /app/.env.local

# Expose the port the app runs on
EXPOSE 3000

# Start the app using Bun
CMD ["bun", "--bun", "/app/server.js"]
