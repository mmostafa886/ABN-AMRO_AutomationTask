#!/bin/bash

# Create the image
docker build -t testimage . 

# Wait for the container to complete
wait $!

# Run the image
docker run --name testimagecont testimage

# Wait for the container to complete
wait $!

#copy Reports foder
docker cp testimagecont:/app/reports ./reports

#Copy Screenshots folder
docker cp testimagecont:/app/screenshots ./screenshots

#Remove the container
docker rm testimagecont