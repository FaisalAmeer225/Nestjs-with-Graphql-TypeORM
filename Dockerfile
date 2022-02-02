FROM node:14

WORKDIR /src

COPY package.json .

RUN yarn install

COPY . .