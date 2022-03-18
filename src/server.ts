//ANCHOR: PACKAGE LIBS
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

//ANCHOR: CUSTOM LIBS
import { config } from './config/env';
import { schema } from './schema/graphql/schema';


//ANCHOR: GraphQL test import
import GraphiQL from 'graphiql';
import {buildSchema, GraphQLSchema} from 'graphql'

// Initialising express instance
const app = express();

// Setting up graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

// Setting up express server
app.listen(config['server']['port'], () => {
    console.log(`Listening on port ${config['server']['port']}`);
});