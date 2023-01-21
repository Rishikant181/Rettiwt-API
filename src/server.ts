// PACKAGE LIBS
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

// CUSTOM LIBS
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
    graphiql: config.is_development
})));

// Setting up express server
app.listen(config.port, async () => {
    console.log(`Listening on port ${config.port}`);
});