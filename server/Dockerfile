FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm i -g sequelize-cli

EXPOSE 5000

CMD [ "npm","run","start" ]