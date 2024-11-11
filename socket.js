const socketIo = require('socket.io');
const logger = require('./log/logger');

function setupSocketIo(server) {
    const io = socketIo(server);

    io.on('connection', socket => {
        logger.info(`New client connected: ${socket.id}`);
        
        // Handle socket disconnection
        socket.on('disconnect', () => {
            logger.info(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
}

module.exports = setupSocketIo;
