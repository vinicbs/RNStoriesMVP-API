const { body } = require('express-validator');
const signUpValidator = () => {
    return [
        body('name').exists(),
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ]
}

const signInValidator = () => {
    return [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ]
}

module.exports = {
    signInValidator,
    signUpValidator
}