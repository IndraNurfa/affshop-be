const Video = require('../model/videoModel');
const Product = require('../model/productModel');
const Comment = require('../model/commentModel');

const thumbnailList = async (req, res) => {
    const {
        query
    } = req.query;

    try {
        let videos;

        if (query) {
            videos = await Video.find({
                title: {
                    $regex: query,
                    $options: 'i'
                }
            });
        } else {
            videos = await Video.find();
        }
        res.json(videos);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getVideoDetails = async (req, res) => {
    try {
        const videos = await Video.findById(req.params.id);

        res.json(
            videos
        );
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const addVideo = async (req, res) => {
    const id = req.user._id;
    const {
        title,
        description,
        imageUrl,
        videoUrl
    } = req.body;

    const video = new Video({
        username: id,
        title: title,
        description: description,
        imageUrl: imageUrl,
        videoUrl: videoUrl,
        like: []
    });

    try {
        const videoToSave = await video.save();
        res.status(200).json({
            message: 'Video saved successfully',
            comment: videoToSave
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    thumbnailList,
    getVideoDetails,
    addVideo
};