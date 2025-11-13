FROM node:20

WORKDIR /nextjs

COPY package.json .

RUN yarn install

RUN yarn config set network-timeout 3000000

COPY . .

RUN yarn run build

CMD ["yarn","start"]

# docker build . -t img-fe

