// PACKAGE
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import 'reflect-metadata';

// SERVICES
import { Rettiwt } from '.';

// SCHEMA
import { rootQuery } from './graphql/queries/RootQuery';

// CONFIGS
import { config } from './config/env';

// Initialising express instance
const app = express();

// Setting up graphql endpoint
app.use('/graphql', graphqlHTTP(req => ({
    schema: new GraphQLSchema({
        query: rootQuery
    }),
    context: Rettiwt({
        auth_token: req.headers['auth_token'] as string,
        ct0: req.headers['ct0'] as string,
        kdt: req.headers['kdt'] as string,
        twid: req.headers['twid'] as string,
    }),
    // If app is running in development environment, enable graphiql
    graphiql: config.is_development
})));

// Setting up express server
app.listen(config.port, async () => {
    console.log(`Listening on port ${config.port}`);
});

Rettiwt().users.getUserTweets('44196397', 40).then(res => console.log(res))