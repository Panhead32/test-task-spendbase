FROM node:20-alpine

WORKDIR /src/app

COPY yarn.lock package.json ./

RUN yarn --frozen-lockfile

COPY . .

EXPOSE 3000

CMD yarn build