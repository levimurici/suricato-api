FROM node:10

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ./api/package*.json .

RUN npm install

COPY ./api/* .

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD [ "node", "api/app.js" ]