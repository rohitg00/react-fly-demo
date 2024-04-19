FROM node:20-alpine as BUILD_IMAGE

WORKDIR /

COPY package.json .

COPY packages packages

RUN npm i 

COPY . .

RUN [ "npm", "run", "build" ]

EXPOSE 8080
CMD [ "npm", "run", "preview" ]