# Rettiwt-API
An API that fetches data from Twitter for other services to use

To run the GraphQL API Server on your local machine, first install all required dependencies from packages.json using:\
npm install

Note: No global packages are used, so you can be at peace ;)

Set the following global variables for running the server\
DEVELOPMENT=<true_or_false>\
APP_PORT=<host_port_number>\

Then build the project project using the command:\
npm run build --> Keep the build command running

Use another terminal to run the command:\
npm run start --> This command actually starts the compiled server

Tp debug the application, run the command:\
npm run debug