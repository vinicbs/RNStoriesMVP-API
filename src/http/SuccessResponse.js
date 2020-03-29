var HttpResponse = require('./HttpResponse');

function SuccessResponse (successCode, message, data, moreInfo = null) {
    HttpResponse.call(
        this, data, message || 'OK', successCode, moreInfo, true);
}

module.exports = SuccessResponse;