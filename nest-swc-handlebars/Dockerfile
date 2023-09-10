FROM node:20-alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY ./package.json .

RUN yarn --no-cache install
RUN yarn add better-sqlite3

RUN yarn --no-cache upgrade

COPY . .

RUN yarn build

CMD ["yarn", "start"]
