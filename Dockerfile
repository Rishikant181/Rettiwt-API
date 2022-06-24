FROM node:alpine
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
ENV APP_PORT 3000
ENV USE_CACHE true
ENV DATA_DB_HOST data
ENV DATA_DB_PORT 27017
ENV CACHE_DB_HOST cache
ENV CACHE_DB_PORT 27017
ENV CORE_HOST server
ENV CORE_PORT 4000
CMD npm run start:dev
EXPOSE 3000