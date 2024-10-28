# Use the official Node.js image as a base
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application (if applicable)
# RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]
