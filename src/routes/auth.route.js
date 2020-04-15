const express = require('express');
const { ValidationError } = require('objection');
const router = express.Router();
const { signUp, signIn, refreshToken, uploadPhoto } = require('../controllers/auth.controller');
const { validToken } = require('../middlewares/AuthMiddleware');
const ValidatorMiddleware = require('../middlewares/ValidatorMiddleware');
const { signInValidator, signUpValidator } = require('../validators/auth.validator');
const { multer } = require('../utils/useful');
const { sendUploadToGCS } = require('../services/upload');

router.post('/register', signUpValidator(), ValidatorMiddleware, signUp);
router.post('/login', signInValidator(), ValidatorMiddleware, signIn);
router.get('/refresh', validToken, refreshToken);
router.post('/upload', multer.single('media'), validToken, sendUploadToGCS, uploadPhoto);

module.exports = router;