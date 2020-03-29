const express = require('express');
const router = express.Router();
const { validToken } = require('../middlewares/AuthMiddleware');
const ValidatorMiddleware = require('../middlewares/ValidatorMiddleware');
const { createValidator } = require('../validators/stories.validator');
const { create, listByUser } = require('../controllers/stories.controller');

router.post('/', validToken, createValidator(), ValidatorMiddleware, create);
router.get('/', validToken, listByUser);

module.exports = router;