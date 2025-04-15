# Stage 1: Build React app
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

# Fix permission for react-scripts
RUN chmod +x ./node_modules/.bin/react-scripts

RUN npm run build
