const express = require('express');
const { ValidationError } = require('objection');
const router = express.Router();
const { signUp, signIn } = require('../controllers/user');
const { validToken } = require('../middlewares/AuthMiddleware');
const User = require('../models/user');

router.post('/register', signUp);
router.post('/login', signIn);

module.exports = router;