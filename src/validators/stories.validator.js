const { body } = require('express-validator');
const createValidator = () => {
    return [
        body('media').exists()
    ]
}

module.exports = {
    createValidator
}