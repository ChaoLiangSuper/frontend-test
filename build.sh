#!/bin/bash

echo 'Building Front End Production Code...............'
react-scripts build
echo 'Building Front End Docker Image...............'
docker build . -t front-end-app
