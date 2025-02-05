# Stage 1: Build React app
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY .npmrc .npmrc
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the source code
COPY . .

# Build the application using Vite
RUN npm run build && ls -al /app/dist

# Stage 2: Serve app using NGINX
FROM nginx:alpine

# Copy the built app to NGINX's HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose the default NGINX port
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
