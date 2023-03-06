# build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/nodeapp

RUN chown -R node:node /usr/src/nodeapp

USER node

COPY *.json ./

RUN npm ci

COPY src src

RUN npm run dev:build

# running the node app
FROM node:18-alpine 

WORKDIR /usr/src/nodeapp

RUN chown -R node:node /usr/src/nodeapp

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

USER node

COPY --chown=node:node --from=build /usr/src/nodeapp/build ./build

#COPY .env ./

EXPOSE 4000

CMD [ "node","build/server.js" ]
