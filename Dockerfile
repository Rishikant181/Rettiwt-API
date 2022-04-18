FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
RUN apk add --no-cache git
CMD npm run start:dev
EXPOSE 3000