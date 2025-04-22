# Stage 1: Build the Angular application
FROM node:22.0.0-alpine AS build

# Set the working directory
WORKDIR /app

# Configure npm
RUN npm config set cache /app/.npm-cache

# Copy package files
COPY package*.json ./

# Install dependencies using cache mount
RUN --mount=type=cache,target=/app/.npm-cache \
    npm ci --only=production

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build --prod

# Stage 2: Create the final Nginx image
FROM nginx:stable-alpine

# Copy the build output from the previous stage
COPY --from=build /app/dist/sakai-ng /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
