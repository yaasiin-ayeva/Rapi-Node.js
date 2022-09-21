// Imports
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;

// Instantiate Server
const server = express();
const port = 8000;

// body-parser configuration 
server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());

// Configure routes
server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour</h1>');
});

server.use('/api/', apiRouter);

// Launch server
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

