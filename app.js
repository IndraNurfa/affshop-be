const express = require('express');
const cors = require('cors');
const routes = require('./routes/route');
const logger = require('./log/logger');
const { connect } = require('./config/dbConfig');
const setupSocketIo = require('./socket'); // Importing Socket.IO setup
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT;

// Connect to MongoDB
connect();

// Middleware configuration
app.use(cors({
    origin: [
        'https://affshop-be-production.vercel.app/',
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Socket.IO without calling `listen`
const io = setupSocketIo(server);

// Attach io to req for access in routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Add routes
app.use('/v1', routes);
app.get('/', (req, res) => res.send('Express Server Running'));

server.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
});

module.exports = { server, app };