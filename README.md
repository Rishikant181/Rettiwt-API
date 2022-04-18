# Rettiwt-API
An API that fetches data from Twitter for other services to use

To run the API on your local machine, first install all required dependencies from packages.json using:
npm install

NOTE: No global packages are used, so tou can be at peace ;)

Then build the project project using the command:
npm run build:watch --> Keep the build command running

Use another terminal to run the command:
npm start:watch --> This command actually starts the compiled server

You can also develope using a developer container:
1.  Clone the repo into a local directory
2.  Build the Docker image by running the command inside the repo: 'docker build -t rettiwt-api .'
3.  If no containers have been initialized before, create and run a container using the command: 'docker run -p <host_port>:3000 rettiwt-api'
4.  If a container has already been initialized, to start(or continue) the container again, use the command: 'docker start <container_name>'

Note: Steps 1 and 2 need to be done only once. After the image has been built and volume created, you don't need to repeat those every time you want to develop.

To use the app in build mode, pull the image from Docker Hub using the command: 'docker pull rishikant181/rettiwt:rettiwt-api' and then run it.
