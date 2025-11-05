# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build for production only
ENV NODE_ENV=production
RUN npm run build:production

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only needed files
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production

# Copy the compiled output
COPY --from=builder /usr/src/app/dist ./dist

# Set environment
ENV NODE_ENV=production

# Expose app port (optional but good practice)
EXPOSE 3015

# Start app (no nodemon)
CMD ["node", "dist/index.js"]
