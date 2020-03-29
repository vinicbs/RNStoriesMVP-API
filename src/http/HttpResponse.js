module.exports = HttpResponse;

function HttpResponse(data, message, httpStatusCode, moreInfo, success) {
    this.constructor.prototype.__proto__ = Error.prototype;
    Error.captureStackTrace(this, this.constructor);
    this.status = parseInt(httpStatusCode, 10);
    this.success = !!success;
    this.message = message + '';
    moreInfo && (this.moreInfo = moreInfo);
    data && (this.data = data);
}