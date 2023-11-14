FROM node:latest

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --unsafe-perm -g nodemon

COPY . .

USER node

CMD ["npm", "start"]