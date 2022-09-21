FROM node:current-alpine as development

WORKDIR /usr/src/app

ADD package*.json ./

RUN npm install

ADD . .

RUN npm run build

CMD ["node", "dist/src/main"]
