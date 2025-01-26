FROM node:23.6.0 AS base 

WORKDIR /app/upload-image-service
COPY package.json .
RUN npm i 
COPY . .

FROM base AS development
EXPOSE 4000
CMD [ "npm","run","start:dev" ]

FROM base AS test
EXPOSE  4000
CMD [ "npm","run", "test" ]


FROM base AS production
EXPOSE  4000
CMD [ "npm","run", "start:prod" ]


