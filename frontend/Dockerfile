FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["sh", "-c", "cp -rf /app/dist/. /app/volume/ && sleep infinity"]