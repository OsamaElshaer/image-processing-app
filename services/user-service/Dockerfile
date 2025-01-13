FROM node:16.18.0 AS base

WORKDIR /app/user-service

FROM base AS development
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

FROM base AS test
COPY package.json .
RUN npm install 
COPY . .
EXPOSE 3000
CMD ["npm", "run", "test"]

FROM base AS production
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
