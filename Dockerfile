FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
RUN apk add --no-cache git
ENV APP_PORT=3000
CMD npm run start:dev
EXPOSE 3000