FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./calculator-frontend/
RUN cd calculator-frontend && npm install

# Bundle app source
COPY . .

# Expose port and start the app
EXPOSE 8000
CMD [ "node", "calculator-frontend/app.js" ]
