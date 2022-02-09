// PACKAGE LIBS
import express from 'express';

// CUSTOM LIBS
import { config } from './config/env';
import { TweetFilter } from './schema/types/TweetData';
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
    // TEST_CODE
    new TweetService(
        config['twitter']['authToken'],
        config['twitter']['csrfToken'],
        config['twitter']['cookie']
    )
    .getTweets(
        "44196397",
        10,
        ''
    )
    .then(data => console.log(data.tweets));
    // TEST_CODE_END

    console.log(`Listening on port ${config['server']['port']}`);
});