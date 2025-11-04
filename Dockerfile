# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build based on NODE_ENV passed as build-arg
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN npm run build:$NODE_ENV

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only built files and minimal dependencies
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

# Copy any other necessary files (like .env, etc. if needed)
# COPY .env .env

# Default environment
ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
