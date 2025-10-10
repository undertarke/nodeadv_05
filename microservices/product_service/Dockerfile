FROM node:20

WORKDIR /product-service

COPY package.json .

RUN yarn install

RUN yarn config set network-timeout 3000000

COPY prisma ./prisma

RUN yarn prisma generate 

COPY . . 

RUN yarn build

CMD ["yarn","start:prod"]

# docker buid . -t img-nest
# docker run -d -p ....

# xóa container => xóa image => docker build => docker run ....