const express = require('express');
const router = express.Router();
const { validToken } = require('../middlewares/AuthMiddleware');
const ValidatorMiddleware = require('../middlewares/ValidatorMiddleware');
const { multer } = require('../utils/useful')
const { createValidator, listValidator } = require('../validators/stories.validator');
const { create, listByUser, upload } = require('../controllers/stories.controller');
const { sendUploadToGCS } = require('../services/upload');

router.post('/', validToken, createValidator(), ValidatorMiddleware, create);
router.get('/', validToken, listValidator(), ValidatorMiddleware, listByUser);
router.post('/upload', validToken, multer.single('media'), sendUploadToGCS, upload);

module.exports = router;