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
    new TweetService(
        config['twitter']['authToken'],
        config['twitter']['csrfToken'],
        config['twitter']['cookie']
    )
    .getTweetReplies("1490827367753056257", '')
    .then(data => {
        console.log(data.replies);
        console.log(data.next);
    })
    
    console.log(`Listening on port ${config['server']['port']}`);
});