# Rettiwt-API
An API for fetching data from TwitterAPI, by reverse-engineering the API used by Twitter client-apps

**The API can either be used as a GraphQL Server or as a standalone npm library**

## 1. GraphQL Server
Using the API as a GraphQL enables complex nested queries to fetch data from twitter.  
To use the API as a server,

1.  Clone the repo  
2.  Build the project using 'npm run build'  
3.  Set the environment variables:  
        -   APP_PORT -> The port number where the server will listen to  
        -   DEVELOPMENT -> Whether to run the server in development mode or not  
4.  Start the server using 'npm run start'  
5.  Make graphql requests to server listening on localhost:port/graphql

## 2. NPM Package
The API can also be used as a standalone npm package.  
The limitation is that, large number of data cannot be fetched automatically, and the data needs to fetched in batches, by using cursors.
Further nested queries are not possible.  
To use the API as an npm package,

1.  In your node project, install the package using 'npm install --save rettiwt-api'.  
2.  import { Rettiwt } from 'rettiwt-api'.  
3.  const rettiwt = Rettiwt('[cookies_string_scraped_from_browser_with_twitter_logged_in]').  
4.  Use the created Rettiwt instance to fetch data from Twitter.  

### **The API uses the cookie of a working Twitter account to authenticate agains the Twitter APIs**
### **So you first need to scrape the cookie of your own logged in Twitter account using your browser and retrieving the cookie from the headers of outgoing request, and pass it to Rettiwt-API**

-   For GraphQL Server mode, pass the cookie in the header while making a request to the graphql server
-   For npm library mode, pass the cookie to the constructor while creating instance of Rettiwt