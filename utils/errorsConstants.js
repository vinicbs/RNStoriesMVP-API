module.exports = Object.freeze({
    noError: 0,
    //Login errors in range 100x
    SessionsErrors: {
        missingFields: 1001,
        emailInUse: 1002,
        queryError: 1003,
        failedAuthentication: 1004
    },
})