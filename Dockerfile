# Use an official Bun.sh runtime as the base image
FROM oven/bun:slim
WORKDIR /app

# Set node environment for production
ENV NODE_ENV=production

# Install dependencies
COPY ./package.json ./bun.lockb ./prisma/ /app/
RUN bun install 

# Now copy the rest of the project
COPY . .

# Build the application
RUN bun run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app using Bun
CMD ["bun", "start"]