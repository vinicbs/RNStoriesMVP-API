
var SuccessResponse = require('../http/SuccessResponse');

function HttpResponseMiddleware(thrownResponse, req, res, next) {
    res.status(thrownResponse.status || 500).send(thrownResponse);
}

module.exports = HttpResponseMiddleware;