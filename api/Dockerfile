FROM node:latest

WORKDIR /usr/src/ripro-vis

EXPOSE 1337 

CMD [ "npm", "start" ]

COPY package*.json ./
RUN npm install

COPY ./*.js .
COPY ./*.png .

