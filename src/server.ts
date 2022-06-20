// PACKAGE LIBS
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

// CUSTOM LIBS

// SERVICES
import { AuthService } from './services/AuthService';
import { CacheService } from './services/CacheService';

// TYPES
import { schema } from './schema/schema';
import { exit } from 'process';

// Initialising express instance
const app = express();

// Setting up graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

// Setting up express server
app.listen(process.env.APP_PORT, async () => {
    // Initializing essential global services
    try {
        await AuthService.getInstance();
    }
    catch(err) {
        exit();
    }
    
    // Initializing non-essential global services
    await CacheService.getInstance();
    
    console.log(`Listening on port ${process.env.APP_PORT}`);
});