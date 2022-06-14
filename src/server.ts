// PACKAGE LIBS
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

// CUSTOM LIBS
import { schema } from './schema/schema';
import { CacheService } from './services/CacheService';
import { FetcherService } from './services/FetcherService';

// Initialising express instance
const app = express();

// Setting up graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

// Setting up express server
app.listen(process.env.APP_PORT, async () => {
    // Creating cache service instance
    try {
        await CacheService.getInstance();
    }
    // If failed to create CacheService instance, continuing without cache
    catch(err) {
        console.log("Continuing without caching");
        FetcherService.allowCache = false;
    }
    
    console.log(`Listening on port ${process.env.APP_PORT}`);
});