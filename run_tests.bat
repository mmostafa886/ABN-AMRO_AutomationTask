@echo off

REM Create the image
docker build -t testimage . 

REM Run the image
docker run --name testimagecont testimage

REM Wait for the container to complete
docker wait testimagecont

REM Copy Reports folder
docker cp testimagecont:/app/reports ./reports

REM Copy Screenshots folder
docker cp testimagecont:/app/screenshots ./screenshots

REM Remove the container
docker rm testimagecont
