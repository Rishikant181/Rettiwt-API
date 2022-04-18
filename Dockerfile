FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
RUN apk add --no-cache git
ENV APP_PORT=3000
ENV CACHE_DB_HOST=mongodb://127.0.0.1
ENV CACHE_DB_PORT=27017
CMD npm run start:dev
EXPOSE 3000