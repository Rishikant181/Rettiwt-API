// PACKAGE LIBS
import express from 'express';

// CUSTOM LIBS
import { config } from './config/env';
import { TweetFilter } from './schema/data/TweetData';
import { AuthService } from './services/AuthService';
import { TweetService } from './services/TweetService';
import { UserAccountService } from './services/UserAccountService';

// Initialising express instance
const app = express();

// Creating root end point
app.use('/', (req, res) => {
    res.send("Hello World");    
})

// Setting up express server
app.listen(config['server']['port'], () => {
    new AuthService().generateGuestToken('https://twitter.com/')
        .then(token => {
            new TweetService().getFilteredTweets(
                new TweetFilter({
                    words: ['tesla'],
                    fromUsers: ['elonmusk'],
                    toUsers: [],
                    count: 20,
                    startDate: '',
                    endDate: '',
                    mentions: [],
                    hashtags: []
                }),
                config['twitter']['authToken'],
                token
            )
        })
    console.log(`Listening on port ${config['server']['port']}`);
});