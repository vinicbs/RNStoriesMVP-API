const express = require('express');
const { ValidationError } = require('objection');
const router = express.Router();
const { signUp, signIn } = require('../controllers/user');
const { validToken } = require('../middlewares/AuthMiddleware');
const ValidatorMiddleware = require('../middlewares/ValidatorMiddleware')
const { signInValidator, signUpValidator } = require('../validators/auth.validator')
const User = require('../models/user');

router.post('/register', signUpValidator(), ValidatorMiddleware, signUp);
router.post('/login', signInValidator(), ValidatorMiddleware, signIn);

module.exports = router;