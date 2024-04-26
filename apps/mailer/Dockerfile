FROM node:alpine as development

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
#RUN pnpm install --global @nestjs/cli
RUN pnpm install

COPY . .

RUN pnpm run build
