FROM node:18.20.2-alpine

RUN apk add git

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY packages/api/ ./packages/api/

RUN yarn workspaces focus --production @quoll/api

EXPOSE 3001

CMD ["yarn", "workspace", "@quoll/api", "serve"]
