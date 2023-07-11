# Stage 1: Build Vue Application
FROM node:16-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install @vue/cli -g

EXPOSE 3001

CMD [ "npm","run","serve" ]