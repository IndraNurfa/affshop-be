const express = require('express');
const http = require('http');
const cors = require('cors');
const routes = require('./routes/route');
const logger = require('./log/logger');
const { connect } = require('./config/dbConfig');
const setupSocketIo = require('./socket'); // Import the separate Socket.IO setup

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

// Connect to MongoDB
connect();

// Configure CORS
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add routes
app.use('/v1', routes);

// Health check endpoint
app.get('/', (req, res) => res.send('Express Server Running'));

// Initialize Socket.IO
const io = setupSocketIo(server); // Importing io setup from a separate file

// Attach io to req in middleware
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Start the server
server.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
});

module.exports = server; // Export only the server for deployment compatibility
