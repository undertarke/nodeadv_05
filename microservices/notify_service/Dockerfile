FROM node:20

WORKDIR /notify-service

COPY package.json .

RUN yarn install

RUN yarn config set network-timeout 3000000

COPY . . 

RUN yarn build

CMD ["yarn","start:prod"]