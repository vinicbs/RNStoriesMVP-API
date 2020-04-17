const express = require('express');
const router = express.Router();
const { validToken } = require('../middlewares/AuthMiddleware');
const ValidatorMiddleware = require('../middlewares/ValidatorMiddleware');
const { multer } = require('../utils/useful')
const { createValidator, listValidator, uploadValidator } = require('../validators/stories.validator');
const { create, listByUser, upload } = require('../controllers/stories.controller');
const { sendUploadToGCS } = require('../services/upload');

router.post('/', validToken, createValidator(), ValidatorMiddleware, create);
router.get('/', validToken, listValidator(), ValidatorMiddleware, listByUser);
router.post('/upload', multer.single('media'), validToken, sendUploadToGCS, uploadValidator(), ValidatorMiddleware, upload);

module.exports = router;