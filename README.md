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

1.  Clone the repo's release branch
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
    ```
    const rettiwt = Rettiwt({
        <put your authentication tokens here. For details, refer to section below>
    }).
    ```
3.  Use the created [Rettiwt](https://rishikant181.github.io/Rettiwt-API/functions/Rettiwt.html) instance to fetch data from Twitter.

**The authentication tokens can be generated in the following way:**

#### A. GraphQL Server:

1.  Make the following query to the GraphQL server:

```
        query {
                Login(email: "your_twitter_email", userName: "your_twitter_username", password: "your_twitter_password") {
                        auth_token
                        ct0
                        kdt
                        twid
                }
        }
```

1.  This will give you 4 tokens: 'auth_token', 'ct0', 'kdt' and 'twid'.
2.  Pass the four tokens in the headers while making any request made to the GraphQL server for fetching data.

#### B. NPM Library:

1.  Use the [Rettiwt().account.login](https://rishikant181.github.io/Rettiwt-API/classes/AccountService.html#login) method to get back 4 tokens: 'auth_token', 'ct0', 'kdt' and 'twid'.
2.  Use these four tokens to initialize a new [Rettiwt](https://rishikant181.github.io/Rettiwt-API/functions/Rettiwt.html) instance as follows:

```
        const rettiwt = new Rettiwt({
                auth_token: "received_auth_token",
                ct0: "received_ct0_token",
                kdt: "received_kdt_token",
                twid: "received_twid_token"
        });
```

3.  Use the created [Rettiwt](https://rishikant181.github.io/Rettiwt-API/functions/Rettiwt.html) instance to fetch data.

### **Due to changes in Twitter API, all methods now require logging in and using the tokens for authentication**

### **I'M NOT RESPONSIBLE IF YOU GET YOUR TWITTER ACCOUNT BANNED!**
