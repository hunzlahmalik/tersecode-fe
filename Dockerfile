FROM node:16 AS FRONTEND
WORKDIR /frontend
COPY . /frontend/
RUN npm install
RUN npm run build