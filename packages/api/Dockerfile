# Run from the root 
# docker build -t api -f packages/api/Dockerfile .

FROM node:18.20.2-alpine

RUN apk add git

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY packages/api/package.json ./packages/api/

RUN yarn workspaces focus --production @quoll/api

COPY packages/api/src ./packages/api/src

EXPOSE 3001

CMD ["yarn", "workspace", "@quoll/api", "serve"]
