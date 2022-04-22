FROM node:alpine
WORKDIR /app
COPY ./package.json .
RUN npm install --legacy-peer-deps
COPY . .
ENV APP_PORT 3000
ENV CACHE_DB_HOST 127.0.0.1
ENV CACHE_DB_PORT 27017
CMD npm run start:dev
EXPOSE 3000