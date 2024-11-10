const pine = require('pine');

const logger = pine();

class APILogger {
    info(message) {
        logger.info(message);
    }

    info(message, data) {
        logger.info(`${message} ${undefined != data ? JSON.stringify(data) : ''}`);
    }

    error(message) {
        logger.error(message);
    }

    error(message, data) {
        logger.error(`${message} ${undefined != data ? JSON.stringify(data) : ''}`);
    }
}

module.exports = new APILogger();