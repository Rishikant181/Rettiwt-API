# Rettiwt-API

A CLI tool and an API for fetching data from Twitter for free!

## Prerequisites

-   NodeJS 20
-   A working Twitter account (optional)

## Installation

It is recommended to install the package globally, if you want to use it from the CLI. Use the following steps to install the package and ensure it's installed correctly:

1. Open a terminal.
2. Install the package using the command `npm install -g rettiwt-api`.
3. Check if the package is installed correctly using the command `rettiwt help`.

For using the package in your own project, you can install it as a [dependency](https://rishikant181.github.io/Rettiwt-API/#md:usage-as-a-dependency).

## Authentication

Rettiwt-API can be used with or without logging in to Twitter. As such, the two authentication strategies are:

-   'guest' authentication (without logging in) grants access to the following resources/actions:

    -   Tweet Details
    -   User Details (by username)
    -   User Replies Timeline
    -   User Timeline

-   'user' authentication (logging in) grants access to the following resources/actions:

    -   Tweet Details
    -   Tweet Like
    -   Tweet List
    -   Tweet Media Upload
    -   Tweet Post
    -   Tweet Retweet
    -   Tweet Retweeters
    -   Tweet Schedule
    -   Tweet Search
    -   Tweet Stream
    -   Tweet Unlike
    -   Tweet Unpost
    -   Tweet Unretweet
    -   User Details (by username or id)
    -   User Follow
    -   User Followed Feed
    -   User Followers
    -   User Following
    -   User Highlights
    -   User Likes
    -   User Media
    -   User Recommended Feed
    -   User Replies Timeline
    -   User Subscriptions
    -   User Timeline
    -   User Unfollow

By default, Rettiwt-API uses 'guest' authentication. If however, access to the full set of resources is required, 'user' authentication can be used. This is done by using the cookies associated with your Twitter/X account, and encoding them into an `API_KEY` for convenience. For getting the said `API_KEY`, there are two approaches:

### 1. Using a browser (recommended):

#### A. For Chrome/Chromium-based browsers:

1. Install the [X Auth Helper extension](https://chromewebstore.google.com/detail/x-auth-helper/igpkhkjmpdecacocghpgkghdcmcmpfhp) from the Chrome Web Store, and allow it to run it in incognito mode.
2. Switch to incognito mode and login to Twitter/X.
3. After successful login, while still being on Twitter/X, click on the extension which will open the extension popup.
4. Click on the `Get Key` button, this will generate the `API_KEY` and will show up in the text-area.
5. Copy the `API_KEY` by either clicking on the `Copy Key` button or manually from the text-area.
6. You may close the browser, but don't log out. Remember, since it's incognito mode, you didn't explicity 'log out', so, while the session will be erased from the browser, the `API_KEY` still remains valid.
7. Save the `API_KEY` for use.

#### B. For Firefox/Firefox-based browsers:

1. Install the [Rettiwt Auth Helper extension](https://addons.mozilla.org/en-US/firefox/addon/rettiwt-auth-helper) from Firefox Add-Ons, and allow it to run it in in-private mode.
2. Switch to in-private mode and login to Twitter/X.
3. After successful login, while still being on Twitter/X, click on the extension which will open the extension popup.
4. Click on the `Get API Key` button, this will generate the `API_KEY` and will show up in the text-area.
5. Copy the `API_KEY` by either clicking on the `Copy API Key` button or manually from the text-area.
6. You may close the browser, but don't log out. Remember, since it's in-private mode, you didn't explicity 'log out', so, while the session will be erased from the browser, the `API_KEY` still remains valid.
7. Save the `API_KEY` for use.

#### Notes:

-   `API_KEY` created in this way should last 5 years from the date of login, as long as the credentials to the account aren't changed.
-   This approach can also be done without going into incognito/in-private mode, in which case you can either login as usual or skip the login step if you're already logged in, and continue from the steps after login. However, this makes the `API_KEY` to last only as long as the Twitter/X account isn't logged out of (you may exit the browser as usual) or 5 years, whichever comes first. That's why it's recommended to use incognito/in-private mode, so that the `API_KEY` isn't accidentially revoked by logging out.

### 2. Using the CLI:

1. Open a terminal.
2. Generate an API_KEY using the command `rettiwt auth login "<email>" "<username>" "<password>"`

    Here,

    - `<email>` is the email of the Twitter account to be used for authentication.
    - `<username>` is the username associated with the Twitter account.
    - `<password>` is the password to the Twitter account.

3. Store the output `API_KEY` in a secure place for later use.

#### Notes:

-   The `API_KEY` created in this way expires after one year from the day it was generated.

## The API_KEY

The API_KEY generated by logging in is what allows Rettiwt-API to authenticate as a logged in user while interacting with the Twitter API ('user' authentication). As such it is a very sensitive information and therefore, must be stored securely. The following points must be kept in mind while using the API_KEY for 'user' authentication:

-   The API_KEY is generated by logging into Twitter using the email, username and password and encoding the returned cookies as a base64 string. This encoded string is the API_KEY.
-   The API_KEY provides the same level of authorization as any standard Twitter account, nothing more, nothing less.
-   Since generation of API_KEY is equivalent to logging in to Twitter, repeated generation attempts might trigger Twitter's anti-bot measures, the same way repeated login attempts do.
-   Therefore, it is recommended to generate the API_KEY only once, then use it every time it is needed.
-   Do not generate an API_KEY if it has not expired yet!

## Notes for non-programmers

-   If you have no idea of programming, it's recommended to use the CLI.
-   The CLI provides an easy to use interface which does not require any knowledge of JavaScript or programming
-   Please skip to [CLI-Usage](https://rishikant181.github.io/Rettiwt-API/#md:cli-usage) for details.

## Usage as a dependency

Rettiwt-API can be used as a dependency for your NodeJS project. In such a case, it is not required to install Rettiwt-API globally and you may install it locally in the root of your project using the command:

-   `npm install --save rettiwt-api` (using npm)

    or

-   `yarn add rettiwt-api` (using yarn)

However, in this case, for accessing the CLI, you will be required to prepend the CLI commands with `npx` in order to tell NodeJS to use the locally installed package.

For example, for generating the API_KEY, the command will be modified as follows:

`npx rettiwt auth login <email> <username> <password>`

## The Rettiwt class

When used as a dependency, the [Rettiwt](https://rishikant181.github.io/Rettiwt-API/classes/Rettiwt.html) class is entry point for accessing the Twitter API.

A new Rettiwt instance can be initialized using the following code snippets:

-   `const rettiwt = new Rettiwt()` (for 'guest' authentication)
-   `const rettiwt = new Rettiwt({ apiKey: API_KEY })` (for 'user' authentication)

The Rettiwt class has three members:

-   `auth` memeber, for managing authentication
-   `tweet` member, for accessing resources related to tweets
-   `user` member, for accessing resources related to users

For details regarding usage of these members for accessing the Twitter API, refer to [Features](https://rishikant181.github.io/Rettiwt-API/#md:features).

## Usage

The following examples may help you to get started using the library:

### 1. Getting the details of a target Twitter user

```js
import { Rettiwt } from 'rettiwt-api';

// Creating a new Rettiwt instance
// Note that for accessing user details, 'guest' authentication can be used
const rettiwt = new Rettiwt();

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

```js
import { Rettiwt } from 'rettiwt-api';

// Creating a new Rettiwt instance using the API_KEY
const rettiwt = new Rettiwt({ apiKey: API_KEY });

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

For more information regarding the different available filter options, please refer to [TweetFilter](https://rishikant181.github.io/Rettiwt-API/classes/TweetFilter.html).

### 3. Getting the next batch of data using a cursor

The previous example fetches the the list of tweets matching the given filter. Since no count is specified, in this case, a default of 20 such Tweets are fetched initially. The following example demonstrates how to use the [cursor string](https://rishikant181.github.io/Rettiwt-API/classes/Cursor.html#value) obtained from the [response](https://rishikant181.github.io/Rettiwt-API/classes/CursoredData.html) object's [next](https://rishikant181.github.io/Rettiwt-API/classes/CursoredData.html#next) field, from the previous example, to fetch the next batch of tweets:

```js
import { Rettiwt } from 'rettiwt-api';

// Creating a new Rettiwt instance using the API_KEY
const rettiwt = new Rettiwt({ apiKey: API_KEY });

/**
 * Fetching the list of tweets that:
 * 	- are made by a user with username <username>,
 * 	- contain the words <word1> and <word2>
 *
 * 'data' is the response object received in the previous example.
 *
 * 'count' is a number less or equal to 20 (the quantity of tweets to return)
 */
rettiwt.tweet.search({
	fromUsers: ['<username>'],
	words: ['<word1>', '<word2>']
}, count, data.next.value)
.then(data => {
	...
})
.catch(err => {
	...
});
```

### 4. Getting an API_KEY during runtime, using 'user' authentication

Sometimes, you might want to generate an API_KEY on the fly, in situations such as implementing Twitter login in your application. The following example demonstrates how to generate an API_KEY during runtime:

```js
import { Rettiwt } from 'rettiwt-api';

// Creating a new Rettiwt instance
const rettiwt = new Rettiwt();

// Logging in an getting the API_KEY
rettiwt.auth.login('<email>', '<username>', '<password>')
.then(apiKey => {
    // Use the API_KEY
	...
})
.catch(err => {
	console.log(err);
});
```

Where,

-   `<email>` is the email associated with the Twitter account to be logged into.
-   `<username>` is the username associated with the Twitter account.
-   `<password>` is the password to the Twitter account.

## Using a proxy

For masking of IP address using a proxy server, use the following code snippet for instantiation of Rettiwt:

```js
/**
 * PROXY_URL is the URL or configuration for the proxy server you want to use.`
 */
const rettiwt = new Rettiwt({ apiKey: API_KEY, proxyUrl: PROXY_URL });
```

This creates a Rettiwt instance which uses the given proxy server for making requests to Twitter.

## Cloud environment

When using this library in an application deployed in a cloud environment, the library might throw error 429, even when under rate limits. This happens because Twitter's v1.1 API endpoints seemingly blocks access from cloud services' IP ranges. These v1.1 API endpoints are the ones used for authentication and as such, authentication tasks are blocked while deployed on cloud environments.

This issue can be bypassed by using a proxy only for authentication, using the following code snippet for creating a new Rettiwt instance:

`const rettiwt = new Rettiwt({ authProxyUrl: PROXY_URL });`

Where,

-   `PROXY_URL` is the URL to the proxy server to use.

Authentication proxy is required only in the following two scenarios:

1.  While using 'guest' authentication.
2.  While creating API_KEY by 'user' authentication.

## Debug logs

Sometimes, when the library shows unexpected behaviour, for troubleshooting purposes, debug logs can be enabled which will help in tracking down the issue and working on a potential fix. Currently, debug logs are printed to the console and are enabled by setting the 'logging' property of the config to true, while creating an instance of Rettiwt:

```js
/**
 * By default, is no value for 'logging' is supplied, logging is disabled.
 */
const rettiwt = new Rettiwt({ apiKey: API_KEY, logging: true });
```

## Accessing raw response

Rettiwt-API also provides direct access to the raw response data, bypassing any preprocessing by the library itself. This can be achieved by using the [`FetcherService`](https://rishikant181.github.io/Rettiwt-API/classes/FetcherService.html) class instead of the `Rettiwt` class, as demonstrated by the example below, which fetches the raw details of a user with the username 'user1':

-   ### JavaScript example:

```js
import { FetcherService, EResourceType } from 'rettiwt-api';

// Creating a new FetcherService instance
const fetcher = new FetcherService({ apiKey: API_KEY });

// Fetching the details of the given user
fetcher
	.request(EResourceType.USER_DETAILS_BY_USERNAME, { id: 'user1' })
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});
```

-   ### TypeScript example:

```ts
import { FetcherService, EResourceType, IUserDetailsResponse } from 'rettiwt-api';

// Creating a new FetcherService instance
const fetcher = new FetcherService({ apiKey: API_KEY });

// Fetching the details of the given user
fetcher
	.request<IUserDetailsResponse>(EResourceType.USER_DETAILS_BY_USERNAME, { id: 'user1' })
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});
```

As demonstrated by the example, the raw data can be accessed by using the `request` method of the `FetcherService` class, which takes two parameters. The first parameter is the name of the requested resource, while the second is an object specifying the associated arguments required for the given resource. The complete list of resource type can be checked [here](https://rishikant181.github.io/Rettiwt-API/enums/AuthService.html#EResourceType). As for the resource specific argurments, they are the same as that of the methods of `Rettiwt` class' methods for the respective resources, but structured as an object. Notice how the `FetcherService` class takes the same arguments as the `Rettiwt` class, and the arguments have the same effects as they have in case of `Rettiwt` class.

## Features

So far, the following operations are supported:

### Authentication

-   [Logging in as user](https://rishikant181.github.io/Rettiwt-API/classes/AuthService.html#login)
-   [Logging in as guest](https://rishikant181.github.io/Rettiwt-API/classes/AuthService.html#guest)

### Tweets

-   [Getting the details of a tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#details)
-   [Liking a tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#like)
-   [Getting the list of tweets from a given Twitter list](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#list)
-   [Posting a new tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#post)
-   [Retweeting a tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#retweet)
-   [Getting the list of users who retweeted a given tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#retweeters)
-   [Scheduling a new tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#schedule)
-   [Searching for the list of tweets that match a given filter](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#search)
-   [Streaming filtered tweets in pseudo-realtime](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#stream)
-   [Unliking a tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#unlike)
-   [Unposting a tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#unpost)
-   [Unretweeting a tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#unretweet)
-   [Unscheduling a tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#unschedule)
-   [Uploading a media file for a tweet](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#upload)

### Users

-   [Getting the details of a user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#details)
-   [Following a given user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#follow)
-   [Getting the followed feed of the logged-in user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#followed)
-   [Getting the list of users who follow the given user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#followers)
-   [Getting the list of users who are followed by the given user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#following)
-   [Getting the list of highlighted tweets of the given user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#highlights)
-   [Getting the list of tweets liked by the logged-in user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#likes)
-   [Getting the media timeline of the given user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#media)
-   [Getting the recommended feed of the logged-in user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#recommended)
-   [Getting the replies timeline of the given user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#replies)
-   [Getting the list of subscriptions of the given user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#subscriptions)
-   [Getting the tweet timeline of the given user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#timeline)
-   [Unfollowing a given user](https://rishikant181.github.io/Rettiwt-API/classes/UserService.html#unfollow)

## CLI Usage

Rettiwt-API provides an easy to use command-line interface which does not require any programming knowledge.

By default, the CLI operates in 'guest' authentication. If you want to use 'user' authentication:

1. Generate an API_KEY as described in [Authentication](https://rishikant181.github.io/Rettiwt-API/#md:authentication).
2. Store the output API_KEY as an environment variable with the name 'API_KEY'.
    - Additionally, store the API_KEY in a file for later use.
    - Make sure to generate an API_KEY only once, and use it every time you need it.
3. The CLI automatically reads this environment variable to authenticate against Twitter.
    - Additionally, the API_KEY can also be passed in manually using the '-k' option as follows: `rettiwt -k <API_KEY> <command>`

Help for the CLI can be obtained from the CLI itself:

-   For help regarding the available commands, use the command `rettiwt help`
-   For help regarding a specific command, use the command `rettiwt help <command_name>`

## API Reference

The complete API reference can be found at [this](https://rishikant181.github.io/Rettiwt-API/modules) page.

## Additional information

-   This API uses the cookies of a Twitter account to fetch data from Twitter and as such, there is always a chance (although a measly one) of getting the account banned by Twitter algorithm.

## Donation

Support this project by donating at my [PayPal](https://paypal.me/Rishikant181?country.x=IN&locale.x=en_GB).
