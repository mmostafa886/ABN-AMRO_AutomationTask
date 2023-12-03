#!/bin/bash

# Create the image
docker build -t testimageff -f ./Dockerfile_ff . 

# Wait for the container to complete
wait $!

# Run the image
docker run --name testimagecontff testimageff


# Wait for image starting to complete
docker wait testimagecontff

# Run the test
# docker exec -it testimagecontff npx testcafe firefox:headless test
# wait $!

#copy Reports foder
docker cp testimagecontff:./reports ./reports

#Copy Screenshots folder
docker cp testimagecontff:./screenshots ./screenshots

#Remove the container
docker rm testimagecontff
