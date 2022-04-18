// PACKAGE LIBS
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

// CUSTOM LIBS
import { config } from './config/env';
import { schema } from './schema/graphql/schema';

// Initialising express instance
const app = express();

// Setting up graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

// Setting up express server
app.listen(config['server']['port'], () => {
    console.log(process.env.APP_PORT);
    console.log(`Listening on port ${config['server']['port']}`);
});