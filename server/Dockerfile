FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run migrate

EXPOSE 5000

CMD [ "npm","run","dev" ]