#!/bin/bash

set -e

STACK=$( if [ -z ${DOCKER_STACK} ]; then echo "${CIRCLE_PROJECT_REPONAME}"; else echo "${DOCKER_STACK}"; fi; )
IMAGE=$( if [ $DOCKER_IMAGE ]; then echo $DOCKER_IMAGE; else echo "minutrade/$CIRCLE_PROJECT_REPONAME"; fi;);
TAG=$(node -p -e "require('./package.json').version")

TOKEN=$(curl -s -H "Content-Type: application/json" -X POST -d '{"username": "'${DOCKER_USER}'", "password": "'$DOCKER_PASSWORD'"}' https://hub.docker.com/v2/users/login/ | jq -r .token)
EXISTS=$(curl -s -H "Authorization: JWT ${TOKEN}" https://registry.hub.docker.com/v2/repositories/${IMAGE}/tags/ | jq -r "[.results | .[] | .name == \"${TAG}\"] | any")

if [ "$EXISTS" == "true" ]; then
  sed -i "s/{PACKAGE_VERSION}/${TAG}/g" stack/${CIRCLE_PROJECT_REPONAME}-stack-*.yml

  echo "Updating project $CIRCLE_PROJECT_REPONAME to version $TAG on docker swarm-$SWARM_ENV";
  echo "Docker Swarm Host: $SWARM_DEPLOY_HOST"
  echo "Project Name: $CIRCLE_PROJECT_REPONAME"
  echo "Stack Name: $STACK"
  echo "Image: $IMAGE";
  echo "Version: $TAG"

  echo $SWARM_DEPLOY_CA | base64 --decode > ca.pem;
  echo $SWARM_DEPLOY_CERT | base64 --decode > cert.pem;
  echo $SWARM_DEPLOY_KEY | base64 --decode > key.pem;

  if [[ ! -s ca.pem || ! -s cert.pem || ! -s key.pem ]]; then
    echo "Error to decode TLS cert!"
    exit 1
  fi

  docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=$SWARM_DEPLOY_HOST login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}
  {
    CURRENT_IMAGE=$( docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=$SWARM_DEPLOY_HOST service ls --format "{{.Image}}" | grep "/$STACK:" )
  } || {
    CURRENT_IMAGE=$( docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=$SWARM_DEPLOY_HOST service ls --format "{{.Image}}" | grep "/$CIRCLE_PROJECT_REPONAME:" )
  } || {
    echo "Error trying to find image by name $STACK or $CIRCLE_PROJECT_REPONAME"
    exit 1
  }
  echo "Current image: $CURRENT_IMAGE"

  if [ "$IMAGE:$TAG" != "$CURRENT_IMAGE" ]; then
    docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=$SWARM_DEPLOY_HOST stack deploy --with-registry-auth -c stack/${CIRCLE_PROJECT_REPONAME}-stack-$SWARM_ENV.yml $STACK
    
    echo "Start deploy verification"
    sleep 30s
    
    SUCESS=0
    for i in $(seq 1 6);
    do
      sleep 10s

      REPLICAS=$( docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=$SWARM_DEPLOY_HOST service ls -f "Name=$STACK""_""$STACK" --format "{{.Replicas}}" )

      echo "Number of replicas: $REPLICAS"
      IFS='/' read -ra REP <<< "$REPLICAS"
      
      if [ "${REP[0]}" == "${REP[1]}" ]; then
        echo "Deploy verified!"
        SUCESS=1
        break
      else
        echo "Verifying deploy!"
      fi
    done

    if [ $SUCESS == 1 ]; then
      echo "The image $IMAGE:$TAG was deployed in swarm-$SWARM_ENV"
      node /minutrade-deploy-toolkit/slack/send-deploy-notification.js "${IMAGE}:${TAG}" "$SWARM_ENV"
    else
      echo "Deploy failed!"
      echo "docker service ps:"
      docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=$SWARM_DEPLOY_HOST service ps "$STACK""_""$STACK"
      echo "docker service logs:"
      docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=$SWARM_DEPLOY_HOST service logs "$STACK""_""$STACK" --no-task-ids --since 10m
      echo "docker service rollback:"
      docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=$SWARM_DEPLOY_HOST service rollback "$STACK""_""$STACK"
      echo "Rollback to image $CURRENT_IMAGE"
      node /minutrade-deploy-toolkit/slack/send-rollback-notification.js "$CURRENT_IMAGE" "${IMAGE}:${TAG}" "$SWARM_ENV"

      exit 1
    fi
  else
    echo "The image $IMAGE:$TAG is already in $SWARM_ENV!"
  fi
else
  echo "The image $IMAGE:$TAG does not exists in docker registry!"
fi