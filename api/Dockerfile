FROM node:latest

WORKDIR /usr/src/ripro-vis

EXPOSE 1337 

CMD [ "npm", "start" ]

COPY package*.json ./
RUN mkdir ./ssl
RUN npm install

COPY ./ssl/* ./ssl/
COPY ./*.png ./
COPY ./*.js ./

