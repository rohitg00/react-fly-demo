# Use the Cerbos base image
FROM ghcr.io/cerbos/cerbos:latest

# Copy the policy files into the container
COPY policies /policies

# Expose the necessary ports for Cerbos PDP
EXPOSE 3592 3593

# Command to start the Cerbos PDP server
CMD ["server"]