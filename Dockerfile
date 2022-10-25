FROM node:17-alpine

RUN mkdir /app

WORKDIR /app

ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install -g serve 

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]