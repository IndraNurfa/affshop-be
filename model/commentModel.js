const mongoose = require('mongoose');

const commentShema = new mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
},
{
    versionKey: false // Hide the __v field
}
);

module.exports = mongoose.model('Comment', commentShema);