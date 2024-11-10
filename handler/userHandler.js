const User = require('../model/userModel');
const logger = require('../log/logger');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id, { email: 1, username: 1, pict: 1, _id:0 });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const editProfile = async (req, res) => {
    try {
        const { username, pict } = req.body;
        
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                message: 'User not authenticated'
            });
        }

        const updatedProfile = {
            username,
            pict
        };
        const options = {
            new: true // Ensures the updated document is returned
        };

        const result = await User.findByIdAndUpdate(req.user._id, updatedProfile, options);

        return res.status(200).json({
            message: 'Profile edited successfully',
            user: result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    getProfile,
    editProfile
};