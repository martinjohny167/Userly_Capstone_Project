# Stage 1: Build React app
FROM node:18 AS build

WORKDIR /app

# Copy only what's needed to install dependencies
COPY package.json package-lock.json* ./

# Install deps
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built React files to Nginx's public dir
COPY --from=build /app/build /usr/share/nginx/html

# Copy a default nginx config if needed
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
