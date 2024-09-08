# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the host files and folders to docker working directory files
COPY . .

# Install the dependencies
RUN npm install --production

# Expose the port the app runs on
EXPOSE 4000

# Start the orchestrator app
CMD ["npm", "start"]