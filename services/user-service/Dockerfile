FROM node:16.18.0 AS builder

WORKDIR /app/user-service
COPY package.json .
RUN npm install
COPY . .

FROM builder AS development
EXPOSE 6000
CMD ["npm", "run", "start:dev"]

FROM builder AS test
EXPOSE 6000
CMD ["npm", "run", "test"]

FROM builder AS production
RUN npm install --only=production
EXPOSE 6000
CMD ["npm", "run", "start:prod"]
