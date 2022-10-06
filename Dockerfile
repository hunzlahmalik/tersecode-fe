FROM node:lts-alpine
ARG REACT_APP_SERVER_URL
WORKDIR /frontend

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn
COPY . .
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
ENV NODE_ENV production
RUN yarn run build
EXPOSE 3000
CMD [ "yarn", "serve", "-s", "build" ]
