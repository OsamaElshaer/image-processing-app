FROM node:23.6.0 AS base

WORKDIR /app/notification-service
COPY package.json .
RUN npm install
COPY . .

FROM base AS development
EXPOSE 5000
CMD [ "npm","run","start:dev"]

FROM base AS test
EXPOSE 5000
CMD [ "npm","run","test"]

FROM base AS prod 
RUN npm install --only=production
EXPOSE 5000
CMD [ "npm","run","start:prod" ]
