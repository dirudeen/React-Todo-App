FROM node:21-alpine3.18

WORKDIR /Docker_Compose/backend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]