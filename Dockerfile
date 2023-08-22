FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn config set registry https://registry.yarnpkg.com
RUN yarn config set @types:registry https://registry.yarnpkg.com
RUN yarn cache clean
RUN yarn --no-cache install

COPY . .

RUN yarn build

CMD ["yarn", "start"]
