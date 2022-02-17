# Rettiwt-API
An API that fetches data from Twitter for other services to use

To run the API on your local machine, first install all required dependencies from packages.json using:
npm install

NOTE: No global packages are used, so tou can be at peace ;)

Then build the project project using the command:
npm run build --> Keep the build command running

Use another terminal to run the command:
npm start --> This command actually starts the compiled server

/* DOCUMENTATION (I don't know where to put it, for now, let it be here)*/

// FETCHING DATA
All the methods used for fetching data reside inside services/DataHandlers

1. UserAccountService --> For fetching data related to a user's account
2. TweetService --> For fetching data related to tweets

Open up a service's source file to see what methods are available to user and type of data they return as well as the types of arguments they take.

In case you need to use the internal types(although I don't think you will be needing them explicityly), navigate to schema/types/*.

This folder contains all the various internal data types used while fetching data