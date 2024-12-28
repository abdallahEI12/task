FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY src/ ./src/

FROM node:alpine

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000

