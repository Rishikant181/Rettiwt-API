FROM node:18.12-alpine3.17
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
ENV DEVELOPMENT=false
ENV USE_CACHE=true
ENV APP_PORT=3000
ENV CACHE_DB_URL=redis://cache:6379
ENV DATA_DB_URL=mongodb://data:27017
CMD npm run start