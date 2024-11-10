const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const logger = require('./log/logger');
const cors = require('cors');
const { connect } = require('./config/dbConfig');
const http = require('http');
const { socketIo } = require('socket.io');

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
connect();

app.disable('x-powered-by');

const { PORT } = process.env;

// Configure middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:3080',
        'http://localhost:8000',
        'http://localhost:80',
        'http://localhost'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposedHeaders: ['Authorization']
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Attach `io` to the `req` object using middleware
app.use((req, res, next) => {
    req.io = io;
    next();
});


// Add Socket.IO connection event
io.on('connection', socket => {
    logger.info(`New client connected: ${socket.id}`);
    
    // Disconnect event
    socket.on('disconnect', () => {
        logger.info(`Client disconnected: ${socket.id}`);
    });
});


// Add routes
app.use('/v1', routes);

app.get('/', (req, res) => res.send('Express'));

// Start the server
server.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
});

module.exports = { app, io };