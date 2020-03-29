const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Multer = require('multer');

// Creates an userId token
const createToken = (userId) => {
    var token = jwt.sign({ data: userId }, process.env.TOKEN_KEY);
    return token;
}

// Get session ID on token
const getUserIdInToken = (token) => {
    var result = '';
    try {
        result = jwt.verify(token, process.env.TOKEN_KEY).data;
    }
    catch (err) { }

    return result;
}

const getHashedPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    })
}

const comparePassword = (password, hashPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, function (err, result) {
            if (err) {
                reject(err);
            } else if (result) {
                resolve(result);
            } else {
                reject(result)
            }
        });
    })
}

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024 // 5mb
});

module.exports = {
    createToken: createToken,
    getUserIdInToken: getUserIdInToken,
    getHashedPassword: getHashedPassword,
    comparePassword: comparePassword,
    multer: multer
};