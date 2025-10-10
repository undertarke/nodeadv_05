FROM node:20

WORKDIR /api-gateway

COPY package.json .

RUN yarn install

RUN yarn config set network-timeout 3000000

COPY . . 

RUN yarn build

EXPOSE 8080

CMD ["yarn","start:prod"]