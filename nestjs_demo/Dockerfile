FROM node:20

WORKDIR /nestjs

COPY package.json .

RUN yarn install 

RUN yarn config set network-timeout 3000000

COPY prisma ./prisma

RUN yarn prisma generate

# RUN yarn prisma generate --schema prisma/schema-mysql.prisma 

COPY . .

RUN yarn run build

CMD ["yarn","start:prod"] 

# docker build . -t img-be