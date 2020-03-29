const User = require('../models/user.model');
const { getHashedPassword, comparePassword, createToken } = require('../utils/useful')
const ErrorResponse = require('../http/ErrorResponse');
const SuccessResponse = require('../http/SuccessResponse');

const signUp = (req, res, next) => {
    const newUser = req.body;
    getHashedPassword(newUser.password).then(hashPassword => {
        newUser.password = hashPassword;
        User.query().insert(newUser).then(user => {
            user.token = createToken(user.id)
            next(new SuccessResponse(200, 'user created', user));
        }).catch(err => {
            next(new ErrorResponse(400, err.name, err.data));
        })
    }).catch(err => {
        next(new ErrorResponse(400, 'password is required'));
    })
}

const signIn = (req, res, next) => {
    const { email, password } = req.body;
    User.query().select().where('email', '=', email).first().then(user => {
        if (user) {
            comparePassword(password, user.password)
                .then(() => {
                    user.token = createToken(user.id)
                    next(new SuccessResponse(200, 'Login Success', user))
                })
                .catch(() => next(new ErrorResponse(400, 'Password incorrect')))
        } else next(new ErrorResponse(400, 'User not found'));
    }).catch(err => {
        next(new ErrorResponse(500, 'Server Error'));
    })
}

module.exports = {
    signUp,
    signIn
}