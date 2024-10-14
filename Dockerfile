# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json before installing dependencies
# This allows Docker to cache the npm install step if package.json hasn't changed
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the app
CMD ["node", "app.js"]
