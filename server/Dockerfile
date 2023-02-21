FROM node:19.2.0-alpine

WORKDIR /usr/src/app/server

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8888

CMD ["npm", "start"]