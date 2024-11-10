const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const logger = require('../log/logger');

require('dotenv').config();

module.exports.verifyToken = async (req, res, next) => {
    const bearerHeader = req.header('Authorization');

    if (!bearerHeader) {
        logger.error('No authorization header');
        return res
            .status(401)
            .json({
                status: false,
                message: 'Authentication failed.'
            });
    }

    try {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res
                .status(401)
                .json({
                    status: false,
                    message: 'User not found.'
                });
        }

        logger.info('User signed in');
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res
                .status(401)
                .json({
                    status: false,
                    message: 'Token has expired.'
                });
        } else {
            return res.status(401).json({
                status: false,
                message: 'Invalid token.'
            });
        }
    }
};