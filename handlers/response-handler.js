const CONSTANTS = require("./../constants");

/**
 * RouteResponseHandler class for handling the response
 * @class
 */
class RouteResponseHandler {
  /**
   * Returns the response to HTTP initiator
   * @param {expressRequestObject} request
   * @param {expressResponseObject} response
   * @param {Object} result
   */
  static sendResponse(request, response, result) {
    const { statusCode, statusText, isOkay, message } = result;

    response.status(statusCode).json({
      ok: isOkay || false,
      status: statusText || CONSTANTS.SERVER_UNAUTHORIZE_HTTP_TEXT,
      code: statusCode || CONSTANTS.SERVER_UNAUTHORIZE_HTTP_CODE,
      message: message || CONSTANTS.SERVER_NOT_ALLOWED_MESSAGE,
      result: result.response || null,
    });
  }
}

/**
 * Module for handling the response
 * @module RouteResponseHandler
 * @type {class}
 */
module.exports = RouteResponseHandler;
