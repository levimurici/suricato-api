#!/bin/bash

set -e

TAG=$(node -p -e "require('./api/package.json').version")
GIT_TAG=$(git tag -l $TAG);

IMAGE=$( if [ $DOCKER_IMAGE ]; then echo $DOCKER_IMAGE; else echo "dendebaiano/$CIRCLE_PROJECT_REPONAME"; fi;);

if [ "$TAG" == "$GIT_TAG" ]; then
  echo "The version $TAG already exists!"
elif ["$CIRCLE_BRANCH" == "main" ]; then
  git tag $TAG
  docker login -u $DOCKER_USER -p $DOCKER_PASSWORD

  echo "building image $IMAGE:$TAG" #| tee $BUILD_REPORT_PATH
  docker build -t $IMAGE:$TAG . #| tee $BUILD_REPORT_PATH

  echo "pushing image $IMAGE:$TAG" #| tee $BUILD_REPORT_PATH
  docker push $IMAGE:$TAG #| tee -a $BUILD_REPORT_PATH

  echo "Image $IMAGE:$TAG published on docker hub!"
  
  git push origin $TAG #| tee -a $BUILD_REPORT_PATH
  echo "$IMAGE:$TAG created on github!"
else
  echo "The version $TAG is unformated!"
  echo "Use MAJOR.MINOR.PATCH in main"
fi