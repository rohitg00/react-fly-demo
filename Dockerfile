FROM node:20-alpine

WORKDIR /

COPY package.json .

COPY packages packages

RUN npm i 

COPY . .

RUN [ "npm", "run", "build" ]

EXPOSE 8080
CMD [ "npm", "run", "preview" ]