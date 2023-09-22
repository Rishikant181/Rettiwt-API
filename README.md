# Rettiwt-API

An API for fetching data from Twitter for free!

## Prerequisites

-   NodeJS 18.14.2
-   A working Twitter account

## Installation

1. Initialize a new Node.JS project using the command `npm init`.
2. Install the package either via npm or yarn:
    - For npm, use the command `npm install --save rettiwt-api`
    - For yarn, use the command `yarn add rettiwt-api`

Although the above process initializes a new project, that is, in fact, not necessary and you may add it to an existing Node.JS project and omit the first step altogether.

## Getting started

1. Generate credentials using [rettiwt-auth](https://www.npmjs.com/package/rettiwt-auth) package, by following these [steps](https://rishikant181.github.io/Rettiwt-Auth/#md:cli-usage).
2. Copy the value of the 'cookies' field from the generated credentials and store it somewhere safe. Let's call this our API_KEY.
3. Create a new instance of Rettiwt, passing in the API key:  
   `const rettiwt = Rettiwt(API_KEY);`
4. Use the created [Rettiwt](https://rishikant181.github.io/Rettiwt-API/classes/Rettiwt.html) instance to fetch data from Twitter.

**Note:** The API_KEY (cookie) that we generated, is a very sensitive information and provides all access to the Twitter account. Therefore, it is generally recommended to store it as an environment variable and use it from there.

## Using a proxy

For masking of IP address using a proxy server, use the following code snippet for instantiation of Rettiwt:

```
/**
 * proxyUrl is the URL or configuration for the proxy server you want to use.`
 */
const rettiwt = Rettiwt(API_KEY, proxyUrl);
```

This creates a Rettiwt instance which uses the given proxy server for making requests to Twitter.

## Usage

The following examples may help you to get started using the library:

### 1. Getting the details of a target Twitter user

```
const { Rettiwt } = require('rettiwt-api');

// Creating a new Rettiwt instance using the API_KEY
const rettiwt = new Rettiwt(API_KEY);

// Fetching the details of the user whose username is <username>
rettiwt.user.details('<username>')
.then(details => {
	...
})
.catch(error => {
	...
});
```

### 2. Getting the list of tweets that match a given filter

```
const { Rettiwt } = require('rettiwt-api');

// Creating a new Rettiwt instance using the API_KEY
const rettiwt = new Rettiwt(API_KEY);

/**
 * Fetching the list of tweets that:
 * 	- are made by a user with username <username>,
 * 	- contain the words <word1> and <word2>
 */
rettiwt.tweet.search({
	fromUsers: ['<username>'],
	words: ['<word1>', '<word2>']
})
.then(data => {
	...
})
.catch(err => {
	...
});
```

### 3. Getting the next batch of data using a cursor

The previous example fetches the the list of tweets matching the given filter. Since no count is specified, in this case, a default of 20 such Tweets are fetched initially. The following example demonstrates how to use the [cursor string](https://rishikant181.github.io/Rettiwt-API/classes/Cursor.html#value) obtained from the [response](https://rishikant181.github.io/Rettiwt-API/classes/CursoredData.html) object's [next](https://rishikant181.github.io/Rettiwt-API/classes/CursoredData.html#next) field, from the previous example, to fetch the next batch of tweets:

```
const { Rettiwt } = require('rettiwt-api');

// Creating a new Rettiwt instance using the API_KEY
const rettiwt = new Rettiwt(API_KEY);

/**
 * Fetching the list of tweets that:
 * 	- are made by a user with username <username>,
 * 	- contain the words <word1> and <word2>
 *
 * 'data' is the response object received in the previous example.
 */
rettiwt.tweet.search({
	fromUsers: ['<username>'],
	words: ['<word1>', '<word2>']
}, data.next.value)
.then(data => {
	...
})
.catch(err => {
	...
});
```

For more information regarding the different available filter options, please refer to [TweetFilter](https://rishikant181.github.io/Rettiwt-API/classes/TweetFilter.html).

## Features

So far, the following operations are supported:

### Tweets

-   [Getting the details of a tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#details)
-   [Favoriting/liking a tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#favorite)
-   [Getting the list of users who favorited/liked a given tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#favoriters)
-   [Getting the list of tweets from a given Twitter list](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#list)
-   [Retweeting/reposting a tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#retweet)
-   [Getting the list of users who retweeted/reposted a given tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#retweeters)
-   [Searching for the list of tweets that match a given filter](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#search)
-   [Posting a new tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#tweet)

### Users

-   [Getting the details of a user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#details)
-   [Getting the list of users who follow the given user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#followers)
-   [Getting the list of users who are followed by the given user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#following)
-   [Getting the list of tweets favorited/liked by the given user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#likes)
-   [Getting the timeline of a user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#timeline)

## API Reference

The complete API reference can be found at [this](https://rishikant181.github.io/Rettiwt-API/) page.

## Additional information

-   This API uses the cookies of a Twitter account to fetch data from Twitter and as such, there is always a chance (altough a measly one) of getting the account banned by Twitter algorithm.
-   From personal experience, not a single one of my accounts has ever been banned by using this library, and this is coming from someone who has been using his primary Twitter account to fetch large amounts of data from Twitter for over 1.5 years now, since the conception of this project.
-   There have been no reports of accounts getting banned, but you have been warned, even though the chances of getting banned is negligible, it is not zero!
