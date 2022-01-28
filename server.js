// Setting app root directory
global.__basedir = __dirname;

// Package libs
const express = require('express');

// Custom libs
const config = require(__basedir + '/config/env.json');

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