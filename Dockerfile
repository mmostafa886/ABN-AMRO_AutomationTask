# This docker file is used to execute all the scripts in the 'test' folder on chromium
# To run excute the test scripts using this docker image, you need to do the following
#     - Rename this dile to be 'Dockerfile'
#     - Execute the command (docker build -t <image_Name> .) to build the image & copy the test file to it
#     - Execute the command (docker run --rm <image_Name>) to run the tests then remove the image
# All the steps of creating the image, run the container, copy the screenshots & report and finally remove the conatiner 
# are listed in both the (run_tests.sh & run_tests.bat) for linux/mac & Windows respectively

# Base image with Node.js and npm pre-installed
FROM testcafe/testcafe:latest

# Install Dependencies
USER root

# Set the working directory to /app
WORKDIR /app

# Copy the TestCafe tests into the image
COPY . .

# Start the script to run TestCafe and copy files
CMD ["chromium", "test"]

