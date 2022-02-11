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
app.listen(config['server']['port'], async () => {
    new TweetService(
        config['twitter']['auth']['authToken'],
        config['twitter']['auth']['csrfToken'],
        config['twitter']['auth']['cookie']
    )
    .getTweets(new TweetFilter({
        words: [],
        hashtags: [],
        fromUsers: ['@elonmusk'],
        toUsers: [],
        mentions: [],
        startDate: '2022-02-10',
        endDate: '',
        count: 1
    }), '')
    .then(res => console.log(res.data.tweets))
    
    console.log(`Listening on port ${config['server']['port']}`);
});