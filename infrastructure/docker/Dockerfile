# Stage 1: Build stage for installing dependencies and preparing the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY src/backend/package*.json ./
RUN npm ci --only=production
COPY src/backend/ ./

# Stage 2: Production stage for creating the final minimal image
FROM node:18-alpine
RUN apk --no-cache add dumb-init
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app ./
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:3000/hello || exit 1
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "index.js"]