# Build React
FROM node:22-alpine AS builder

WORKDIR /app

COPY frontend/my-app/package*.json ./
RUN npm install

COPY frontend/my-app .
RUN npm run build

# Nginx
FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html