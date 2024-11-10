const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username:{
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    pict: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
},
{
    versionKey: false // Hide the __v field
});

module.exports = mongoose.model('User', userSchema);