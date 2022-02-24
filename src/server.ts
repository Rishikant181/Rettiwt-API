// PACKAGE LIBS
import express from 'express';

// CUSTOM LIBS
import { config } from './config/env';
import { TweetFilter } from './schema/types/TweetData';
import { CacheService } from './services/CacheService';
import { TweetService } from './services/DataServices/TweetService';

// Initialising express instance
const app = express();

// Creating root end point
app.use('/', (req, res) => {
    res.send("Hello World");    
})

// Setting up express server
app.listen(config['server']['port'], async () => {
    console.log(`Listening on port ${config['server']['port']}`);

    /* TEST CODE */
    var next;
    var count = 0;

    var service = new TweetService(
        config['twitter']['auth']['authToken'],
        config['twitter']['auth']['csrfToken'],
        config['twitter']['auth']['cookie']
    );

    var cache = new CacheService();

    while(true) {
        var res = await service.getTweets(new TweetFilter({
            words: [],
            hashtags: [],
            fromUsers: ['@elonmusk'],
            toUsers: [],
            mentions: [],
            startDate: '',
            endDate: '2021-06-03',
            count: 20
        }), next);

        if(res.success) {
            cache.write(res.data.tweets);
            next = res.data.next;
            count += res.data.tweets.length;
            console.log(`${res.success}\t\t${count}\t\t${res.data.tweets.at(-1).createdAt}`);
        }
        else {
            console.log("Done");
            break;
        }
    }
    /* TEST CODE END */
});