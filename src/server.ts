// PACKAGE LIBS
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

// CUSTOM LIBS
import { serversOK } from './ServerChecks';
import { CacheService } from './services/CacheService';
import { rootQuery } from './queries/RootQuery';
import { GraphQLSchema } from 'graphql';
import { config } from './config/env';

// Initialising express instance
const app = express();

// Setting up graphql endpoint
app.use('/graphql', graphqlHTTP(req => ({
    schema: new GraphQLSchema({
        query: rootQuery
    }),
    context: req,
    // If app is running in development environment, enable graphiql
    graphiql: config.isDevelopment
})));

// Setting up express server
app.listen(config.port, async () => {
    // Checking the status of all servers and waiting till all servers are up
    await serversOK();
    
    // Initializing non-essential global services
    await CacheService.getInstance();
    
    console.log(`Listening on port ${config.port}`);
});