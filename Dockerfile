# Use an official Bun.sh runtime as the base image
FROM oven/bun:slim
WORKDIR /app

# Set node environment for production
ENV NODE_ENV=production

# Install dependencies
COPY . .
RUN bun install --lockfile && \
	bun run build && \
	mv /app/.next/static /app/.next/standalone/.next/static && \
	mv /app/public /app/.next/standalone/public && \
	rm -rf /app/node_modules /root/.bun /root/.cache /app/.next/cache /tmp

# Expose the port the app runs on
EXPOSE 3000

# Start the app using Bun
CMD ["bun", "--bun", "/app/.next/standalone/server.js"]