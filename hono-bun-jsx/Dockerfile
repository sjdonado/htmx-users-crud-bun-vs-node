FROM oven/bun

EXPOSE 3000

WORKDIR /usr/src/app

COPY ./package.json .

RUN bun install

COPY . .

RUN bun run build

CMD ["bun", "start"]
