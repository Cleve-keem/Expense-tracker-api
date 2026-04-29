FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy lockfile and package.json first for better caching
COPY pnpm-lock.yaml package.json ./

RUN pnpm install

# Copy the rest of your code
COPY . .

# Expose your app port
EXPOSE 5001

# Run the app using tsx for development (or change to pnpm start for prod)
CMD ["pnpm", "dev"]
