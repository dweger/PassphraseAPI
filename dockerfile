# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the remaining project files to the container
COPY . .

# Expose the port that the API will listen on
EXPOSE 3000

# Start the API server when the container starts
CMD [ "node", "app.js" ]
