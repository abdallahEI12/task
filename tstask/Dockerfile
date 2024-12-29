FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.tsbuildinfo ./

RUN npm ci --only=production

COPY build/ ./build

FROM node:alpine

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000

