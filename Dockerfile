# Use a node base image
FROM node:lts-alpine

# Install http-server to serve static content
RUN npm install -g http-server

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files and folders to the current working directory (/app)
COPY . .

# Build the app for production with minification
RUN npm run build

# Expose port
EXPOSE ${PORT}

# Run http-server to serve the build
CMD [ "http-server", "dist" ]
