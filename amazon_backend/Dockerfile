FROM node:20

WORKDIR /node-app

COPY package.json .

RUN yarn install

RUN yarn config set network-timeout 3000000

COPY prisma ./prisma

RUN yarn prisma generate 

RUN yarn prisma generate --schema prisma/schema-mysql.prisma 

COPY . . 

RUN yarn build

EXPOSE 8080

CMD ["yarn","start:prod"]

# docker buid . -t img-nest
# docker run -d -p ....

# xóa container => xóa image => docker run ....