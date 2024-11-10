/* eslint-disable arrow-body-style */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require('../log/logger');

const createSecretToken = id => {
    try {
        logger.info(`Processing secret ${id}`);

        const token = jwt.sign({ id }, process.env.SECRET_KEY, {
            expiresIn: '3h'
        });

        logger.info(`Created secret token ${token}`);
        return token;
    } catch (error) {
        logger.error(`Error creating token: ${error.message}`);
        return null;
    }
};

module.exports = { createSecretToken };