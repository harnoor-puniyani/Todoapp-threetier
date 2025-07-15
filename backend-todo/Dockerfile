FROM node:lts-alpine as builder

WORKDIR /app

COPY . .

RUN npm run install

CMD ["node","server.js"]