const jwt = require('jsonwebtoken');
const ErrorResponse = require('../http/ErrorResponse');

// Validates userId token

const validToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
        if (err) {
            next(new ErrorResponse(401, 'Unauthorized'));
        } else {
            req.body.authUser = decoded.data;
            next();
        }
    });
}

module.exports = {
    validToken
}