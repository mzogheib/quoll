# Run from the root 
# docker build -t api -f packages/api/Dockerfile .

# Builder stage
FROM node:18.20.2-alpine AS builder

RUN apk add git

WORKDIR /app

# Install dependencies before copying the source code for better caching
# We don't install with --production flag because we need to build the app
# with TypeScript, which is a dev dependency
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY packages/api/package.json ./packages/api/
RUN yarn workspaces focus @quoll/api

# Copy the source code and build the app
COPY packages/api/src ./packages/api/src
COPY packages/api/tsconfig.json ./packages/api/
RUN yarn workspace @quoll/api build

# Run stage
FROM node:18.20.2-alpine

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY packages/api/package.json ./packages/api/

# Dev dependencies are not needed now so install with --production
RUN yarn workspaces focus --production @quoll/api

COPY --from=builder /app/packages/api/dist ./packages/api/dist

EXPOSE 3001

CMD ["yarn", "workspace", "@quoll/api", "serve"]
