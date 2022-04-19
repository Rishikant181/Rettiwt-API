FROM node:alpine
WORKDIR /app
COPY ./package.json .
RUN npm install --legacy-peer-deps
COPY . .
CMD npm run start:dev
EXPOSE 3000