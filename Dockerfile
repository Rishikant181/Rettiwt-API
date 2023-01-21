FROM node:18.12-alpine3.17
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build
ENV DEVELOPMENT=false
ENV USE_CACHE=false
ENV APP_PORT=3000
ENV CACHE_DB_URL=redis://cache:6379
CMD npm run start