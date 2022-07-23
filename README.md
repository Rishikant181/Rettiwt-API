# Rettiwt-API
An API that fetches data from Twitter for other services to use

To run the API on your local machine, first install all required dependencies from packages.json using:\
npm install

Note: No global packages are used, so you can be at peace ;)

Set the following global variables for running the server\
APP_PORT=<host_port_number>\
CACHE_DB_HOST=<cache_db_hostname/ip>\
CACHE_DB_PORT=<cache_db_port_number>\
DATA_DB_HOST=<data_db_hostname/ip>\
DATA_DB_PORT=<data_db_port_number>\

Note: CACHE DB refers to Redis server and DATA DB refers to MongoDB server

Then build the project project using the command:\
npm run build:watch --> Keep the build command running

Use another terminal to run the command:\
npm start:watch --> This command actually starts the compiled server

You can also develope using a developer container, by building an image using the Dockerfile provided

To use the app in build mode, pull the image from Docker Hub using the command: 'docker pull rishikant181/rettiwt:rettiwt-api' and then run it.
