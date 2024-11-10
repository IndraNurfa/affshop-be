const bcrypt = require('bcryptjs');
const User = require('../model/userModel');
const logger = require('../log/logger');
const { createSecretToken } = require('../utils/tokenUtil');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUserEmail = await User.findOne({
            email
        });
        const existingUserUsername = await User.findOne({
            username
        });

        if (existingUserEmail) {
            return res.status(409).json({
                error: 'This email already exists.'
            });
        }

        if (existingUserUsername) {
            return res.status(409).json({
                error: 'This username already exists.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = createSecretToken(user._id);
        return { token, user };
    } catch (err) {
        res.status(500).json({
            error: 'An error occurred while registering the user.'
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials. Please try again.'
            });
        }
        logger.info('Checking email successfully');

        const isPasswordValid = user && (await bcrypt.compare(password, user.password));

        if (!isPasswordValid) {
            throw new Error('Incorrect password or email');
        }

        logger.info('Password valid');

        const token = createSecretToken(user._id);

        if (!token) {
            return res.status(500).json({
                error: 'An error occurred while generating the token.'
            });
        }
        
        return res.status(200).json({
            message: 'Successfully logged in',
            data: { token: token }
        });
    } catch (err) {
        res.status(500).json({
            error: 'An error occurred while logging in.'
        });
    }
};

const getSession = async (req, res) => {
    try {
        const user = await User.findById(req.user._id, { pict: 1, username: 1, _id:0 });
        if(!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
        return res.json(user);
    } catch (error) {
        logger.error('Error in getSession:', error);
        res.status(500).json({
            message: error.message
        });
    }
};



const logoutUser = (req, res) => {
    req.user.destroy(err => {
        if (err) {
            console.error('Error while logging out:', err);
            res.status(500).json({
                message: err.message
            });
        } else {
            // Clear the user cookie
            res.clearCookie('userId');
            res.clearCookie('username');

            res.status(200).json({
                message: 'Logout successful'
            });
        }
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getSession
};
