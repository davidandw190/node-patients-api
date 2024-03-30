# Base stage
FROM node:18-bullseye AS base
WORKDIR /usr/src/app
COPY package.json ./

# Development stage
FROM base AS dev
ENV NODE_ENV=dev
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]

# Build stage
FROM dev AS build
RUN npm run start:build

# Production stage
FROM base AS prod
ENV NODE_ENV=prod
RUN npm install --omit=dev
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
