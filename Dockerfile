# Use a lightweight web server
FROM nginx:alpine

# Copy the current directory contents into /usr/share/nginx/html in the container
COPY . /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
