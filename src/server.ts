//ANCHOR: PACKAGE LIBS
import express from 'express';

//ANCHOR: CUSTOM LIBS
import { config } from './config/env';
import { TweetFilter } from './schema/types/TweetData';
import { CacheService } from './services/CacheService';
import { TweetService } from './services/DataServices/TweetService';
import { UserAccountService } from './services/DataServices/UserAccountService';
import {schema} from './schema/graphql/queries/RootQuery'

//ANCHOR: GraphQL test import
import GraphiQL from 'graphiql';
import {buildSchema, GraphQLSchema} from 'graphql'
import {graphqlHTTP} from 'express-graphql'

// Initialising express instance
const app = express();

// Creating root end point
app.use('/', (req, res) => {
    res.send("Hello World");    
})
app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true

}));





// Setting up express server
app.listen(config['server']['port'], () => {
    console.log(`Listening on port ${config['server']['port']}`);
});