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
        config['twitter']['authToken'],
        config['twitter']['csrfToken'],
        config['twitter']['cookie']
    )
    .getFilteredTweets(new TweetFilter({
        words: [],
        hashtags: [],
        fromUsers: ['@elonmusk'],
        toUsers: [],
        count: 10,
        startDate: '',
        endDate: '',
        mentions: []
    }), '')
    .then(data => {
        console.log(data.tweets);
    })
    
    console.log(`Listening on port ${config['server']['port']}`);
});