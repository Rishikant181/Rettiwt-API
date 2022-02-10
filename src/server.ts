// PACKAGE LIBS
import express from 'express';

// CUSTOM LIBS
import { config } from './config/env';
import { TweetFilter } from './schema/types/TweetData';
import { AuthService } from './services/fetchers/AuthService';
import { TweetService } from './services/fetchers/TweetService';
import { UserAccountService } from './services/fetchers/UserAccountService';

// Initialising express instance
const app = express();

// Creating root end point
app.use('/', (req, res) => {
    res.send("Hello World");    
})

// Setting up express server
app.listen(config['server']['port'], () => {
    new TweetService(
        config['twitter']['auth']['authToken'],
        config['twitter']['auth']['csrfToken'],
        config['twitter']['auth']['cookie']
    )
    .getTweets(
        44196397,
        10,
        ''
    )
    .then(res => {
        console.log(res.data.tweets);
        console.log(res.data.tweets.length);
        console.log(res.data.next);
    })
    
    console.log(`Listening on port ${config['server']['port']}`);
});