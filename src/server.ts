// PACKAGE
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';

// Services
import { UserService } from './services/data/UserService';
import { TweetService } from './services/data/TweetService';
import { AccountService } from './services/accounts/AccountService';
import { AuthService } from './services/AuthService';

// SCHEMA
import { rootQuery } from './graphql/queries/RootQuery';

// CONFIGS
import { config } from './config/env';
import { trendOn } from './types/Trends';

// Initialising express instance
const app = express();

// Setting up graphql endpoint
app.use('/graphql', graphqlHTTP(req => ({
    schema: new GraphQLSchema({
        query: rootQuery
    }),
    context: {
        users: new UserService(new AuthService(req.headers.cookie as string)),
        tweets: new TweetService(new AuthService(req.headers.cookie as string)),
        account: new AccountService()
    },
    // If app is running in development environment, enable graphiql
    graphiql: config.is_development
})));

// Setting up express server
app.listen(config.port, async () => {
    console.log(`Listening on port ${config.port}`);
});
