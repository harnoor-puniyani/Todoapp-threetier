FROM node:lts-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

CMD ["node","server.js"]