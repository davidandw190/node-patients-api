FROM node:21.7.1-bullseye AS base
WORKDIR /usr/src/app
COPY package.json ./


FROM base as dev
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install
COPY . .
EXPOSE 3000
CMD [ "node", "run", "start:dev" ]


FROM base AS production
ENV NODE_ENV prod
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install
EXPOSE 4000
CMD [ "node", "run", start:prod ]