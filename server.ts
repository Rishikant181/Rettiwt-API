// Package libs
import express from 'express';

// Custom libs
import {
    config
} from './config/env';
import {
    AuthService
} from './services/AuthService';

// Initialising express instance
const app = express();

// Creating root end point
app.use('/', (req, res) => {
    res.send("Hello World");
})

// Setting up express server
app.listen(config['server']['port'], () => {
    console.log(`Listening on port ${config['server']['port']}`);
});