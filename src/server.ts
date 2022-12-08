// PACKAGE LIBS
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

// CUSTOM LIBS
import { serversOK } from './ServerChecks';
import { AuthService } from './services/AuthService';
import { LogService } from './services/LogService';
import { CacheService } from './services/CacheService';
import { rootQuery } from './queries/RootQuery';
import { exit } from 'process';
import { GraphQLSchema } from 'graphql';

// Initialising express instance
const app = express();

// Setting up graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema: new GraphQLSchema({
        query: rootQuery
    }),
    graphiql: true
}));

// Setting up express server
app.listen(process.env.APP_PORT, async () => {
    // Checking the status of all servers and waiting till all servers are up
    await serversOK();
    
    // Initializing essential global services
    try {
        await AuthService.getInstance();
        await LogService.getInstance();
    }
    catch(err) {
        exit();
    }
    
    // Initializing non-essential global services
    await CacheService.getInstance();
    
    console.log(`Listening on port ${process.env.APP_PORT}`);
});