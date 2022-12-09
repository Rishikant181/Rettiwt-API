FROM node:alpine3.16
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
CMD npm run start
EXPOSE 3000