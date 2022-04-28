// PACKAGE LIBS
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

// CUSTOM LIBS
import { schema } from './schema/graphql/schema';
import { AccountsService } from './services/accounting/AccountsService';

// Initialising express instance
const app = express();

// Setting up graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

// Setting up express server
app.listen(process.env.APP_PORT, () => {
    console.log(`Listening on port ${process.env.APP_PORT}`);
});