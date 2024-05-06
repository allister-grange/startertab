# Use an official Bun.sh runtime as the base image
FROM oven/bun:slim
WORKDIR /app

# Set node environment for production
ENV NODE_ENV=production

# Install dependencies
RUN bun install sharp
COPY package.json bun.lockb prisma/schema.prisma ./
RUN bun install

# Now copy the rest of the project
COPY . .

# Build the application
COPY .env.local ./
RUN bun run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app using Bun
CMD ["bun", "start"]