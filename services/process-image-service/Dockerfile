FROM node:23.6.0 AS base
WORKDIR /app/process-image-service
COPY package.json .
RUN npm install
COPY . .


FROM base AS development
EXPOSE 9000
CMD [ "npm","run","start:dev" ]

FROM base AS test
EXPOSE  9000
CMD [ "npm","run", "test" ]


FROM base AS production
EXPOSE  9000
CMD [ "npm","run", "start:prod" ]


