# Rettiwt-API
An API for fetching data from TwitterAPI, without any rate limits!

#### **This API is not a replacement of official Twitter API, since it does not scale**  
#### **It works well for small applications like the one side project you started and are never gonna finish**  
#### **If you want something that will scale as you application grows, Twitter API is the way to go**  

#### **The API can either be used as a GraphQL Server or as a standalone npm library**

#### **For complete documentation and API reference, head over to the [documentation](https://rishikant181.github.io/Rettiwt-API/)**

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

**You can go to localhost:port/graphql to see the graphql schema**

## 2. NPM Package
The API can also be used as a standalone npm package.  
The limitation is that, large number of data cannot be fetched automatically, and the data needs to fetched in batches, by using cursors.
Further nested queries are not possible.  
To use the API as an npm package,

1.  In your node project, install the package using 'npm install --save rettiwt-api'.  
2.  import { Rettiwt } from 'rettiwt-api'.  
3.  const rettiwt = Rettiwt().  
4.  Use the created Rettiwt instance to fetch data from Twitter.  

This creates an instance of Rettiwt which can be used to fetch data from Twitter. This instance works as guest and no form of authentication is used. However, guest mode implies functionalities such fetching of user followings, followers, likes and tweet likes, retweets, quotes and replies is not possible. Whatever data can be viewed in Twitter without loggin in, can be accessed this way.  

If you wan't full functionality, you need to use the cookie of a logged in Twitter account, which can be retrieved from the browser.

-   For GraphQL Server mode, you can get the cookie using the Login query and pass the received cookie-string in the header while making a request to the graphql server
-   For npm library mode, you can get the cookie using the Rettiwt().account.login method and pass the received cookie-string to the constructor while creating instance of Rettiwt

### **If you don't want to risk your twitter account getting banned, using cookies is completely optional and you can omit passing cookie and use the API as guest**  
### **No likes, followers, followings, retweets, replies, tweet likes, quotes can be fetched without using cookie!**  
### **It's completely safe to use the API as a guest and not using cookies, since that way, no form of authentication is used**
### **If you decide to use cookies for full functionality, I'M NOT RESPONSIBLE IF YOU GET YOU TWITTER ACCOUNT BANNED!**
