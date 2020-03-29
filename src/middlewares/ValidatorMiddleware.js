const { validationResult } = require('express-validator')
const ErrorResponse = require('../http/ErrorResponse');

module.exports = ValidatorMiddleware = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return next(new ErrorResponse(400, 'Body parameters not fulfilled.', errors));
}