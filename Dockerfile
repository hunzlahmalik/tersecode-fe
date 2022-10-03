FROM node:16 AS FRONTEND
EXPOSE 3000
EXPOSE 80
WORKDIR /frontend
COPY . /frontend/
RUN yarn
RUN yarn build