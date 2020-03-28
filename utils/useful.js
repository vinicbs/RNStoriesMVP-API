var jwt = require('jsonwebtoken');
var DB = require('../db').DB,
    knex = DB.knex;

// Creates an userId token
function createToken(userId) {
    var token = jwt.sign({ data: userId }, process.env.TOKEN_KEY);
    return token;
}

// Validates userId token
function validToken(token, callback) {
    jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
        if (err) {
            callback(null, false);
        } else {

            callback(null, true);
        }
    });
}

// Get session ID on token
function getUserIdInToken(token) {
    var result = '';
    try {
        result = jwt.verify(token, process.env.TOKEN_KEY).data;
    }
    catch (err) { }

    return result;
}

module.exports = {
    createToken: createToken,
    validToken: validToken,
    getUserIdInToken: getUserIdInToken
};