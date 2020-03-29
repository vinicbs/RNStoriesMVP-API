var HttpResponse = require('./HttpResponse');

module.exports = ErrorResponse;

function ErrorResponse (errorCode, message, moreInfo) {
    HttpResponse.call(
        this, null, message || 'Bad Request', errorCode, moreInfo);
}