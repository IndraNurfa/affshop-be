const logger = require('../log/logger');
const Comment = require('../model/commentModel');
const mongoose = require('mongoose');
const io = require('socket.io')(require('../app'));

const addComment = async (req, res) => {
    try {
        const comment = new Comment({
            videoId: req.body.videoId,
            userId: req.user._id,
            comment: req.body.comment,
            timestamp: Date.now()
        });
        const commentToSave = await comment.save();

        logger.info(`New comment saved: ${commentToSave}`);

        io.emit('newComment', commentToSave);

        res.status(200).json({
            message: 'Comment saved successfully',
            comment: commentToSave
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getComments = async (req, res) => {
    try {
        const videoId = req.params.id;
        const comments = await Comment.aggregate([
            {
                $match: {
                    videoId: new mongoose.Types.ObjectId(videoId)
                }
            },
            {
                $lookup: {
                    from: 'users', // The name of the users collection
                    localField: 'userId', // Field from the comments collection
                    foreignField: '_id', // Field from the users collection
                    as: 'userDetails' // Output array field
                }
            },
            {
                $unwind: {
                    path: '$userDetails', // Unwind the userDetails array
                    preserveNullAndEmptyArrays: true // Keep comments without users
                }
            },
            {
                $project: {
                    _id: 1, // Include comment ID
                    videoId: 1, // Include video ID
                    comment: 1, // Include comment text
                    timestamp: 1, // Include timestamp
                    'userDetails.username': 1 // Include username from userDetails
                }
            }
        ]);
        res.json(comments);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

module.exports = {
    addComment,
    getComments
};