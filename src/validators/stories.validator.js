const { body, query } = require('express-validator');
const createValidator = () => {
    return [
        body('media').exists()
    ]
}

const listValidator = () => {
    return [
        query('page').exists().isInt(),
        query('page_size').exists().isInt({ min: 1, max: 10 })
    ]
}

const uploadValidator = () => {
    return [
        query('type').exists().isIn(['video', 'image'])
    ]
}

module.exports = {
    createValidator,
    listValidator,
    uploadValidator
}