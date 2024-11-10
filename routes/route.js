const express = require('express');
const router = express.Router();

const {
    thumbnailList,
    getVideoDetails,
    addVideo
} = require('../handler/videoHandler');

const {
    addComment,
    getComments
} = require('../handler/commentHandler');

const {
    registerUser,
    loginUser,
    logoutUser,
    getSession
} = require('../handler/authHandler');

const {
    addProduct,
    getProduct
} = require('../handler/productHandler');

const {
    getProfile,
    editProfile
} = require('../handler/userHandler');

const {
    verifyToken
} = require('../middleware/authMiddleware');

// Home page
router.get('/getThumbnails', thumbnailList);

// Product handler
router.post('/addProduct/:id', verifyToken, addProduct);
router.get('/getProduct/:id', getProduct);

// Video handler
router.get('/getVideo/:id', getVideoDetails);
router.post('/addVideo', verifyToken, addVideo);

// Comment handler
router.post('/comment', verifyToken, addComment);
router.get('/comment/:id', getComments);

// Auth handler
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getSession', verifyToken, getSession);

// User handler
router.get('/getProfile', verifyToken, getProfile);
router.post('/profile', verifyToken, editProfile);

module.exports = router;