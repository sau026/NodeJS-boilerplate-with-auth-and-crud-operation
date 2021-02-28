const CONSTANTS = require('./../constants');
const RouteResponseHandler = require('./../handlers/response-handler');
const queryHandler = require('./query-handler');
const jwt = require("jsonwebtoken")

/**
 * RouteHandler class for handling the HTTP routes
 * @class
 */
class RouteHandler{
	async checkUser(request, response){
		const username = request.body.username;
		const password = request.body.password;
		if(!username || username === ''){
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.USERNAME_NOT_FOUND,
				response: null,
			})
		} else if(!password || password === ''){
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.PASSWORD_NOT_FOUND,
				response: null,
			})
		} else{
			try{
				const result = await queryHandler.checkUser(username, password);
				const token = jwt.sign({ username }, CONSTANTS.JWT_KEY, {
					algorithm: "HS256",
					expiresIn: CONSTANTS.JWT_EXPIRY_SECONDS,
				})
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_OK_HTTP_CODE,
					statusText: CONSTANTS.SERVER_OK_HTTP_TEXT,
					isOkay: true,
					message: CONSTANTS.LOGIN_SUCESS,
					response: {
						jwtToken: token					
					} ,
				});
			} catch(error){
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE,
					statusText: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_TEXT,
					isOkay: false,
					message: error,
					response: null,
				});
			}
		}
	}

	/**
	 * Responsible for inserting user into DB
	 * @param {expressRequestObject} request
	 * @param {expressResponseObject} response
	 */
	async registerUser(request, response){
		const username = request.body.username;
		const password = request.body.password;
		const email = request.body.email;

		if(username === '' || username === null) {
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.AD_SLOT_ID_MISSING,
				response: null,
			});
		} else {		
			try {
				const data = {
					username,
					success_status: questions !== '' && questions !== undefined && questions.length > 0,
					stop_survey: stopSurvey !== '' && stopSurvey !== undefined,
					questions
				}
				await queryHandler.submitFeedback(data);
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_OK_HTTP_CODE,
					statusText: CONSTANTS.SERVER_OK_HTTP_TEXT,
					isOkay: true,
					message: CONSTANTS.AD_SLOTS_FETCHED,
					response: {
						feedback_saved: true
					}
				});
								
			} catch (error) {
				console.log(error)
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE,
					statusText: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_TEXT,
					isOkay: false,
					message: CONSTANTS.SERVER_ERROR_MESSAGE,
					response: {
						feedback_saved: false
					}
				});
			}
		}
	}

	async getAllUser(request, response){
		const username = request.body.username;
		if(!username || username === ''){
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.USERNAME_NOT_FOUND,
				response: null,
			})
		} else{
			try{
				const result = await queryHandler.getAllUser(username);
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_OK_HTTP_CODE,
					statusText: CONSTANTS.SERVER_OK_HTTP_TEXT,
					isOkay: true,
					message: 'abc',
					response: {
						data: result					
					} ,
				});
			} catch(error){
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE,
					statusText: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_TEXT,
					isOkay: false,
					message: error,
					response: null,
				});
			}
		}
	}

	routeNotFoundHandler(request, response){
		response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
			error : true,
			message : CONSTANTS.ROUTE_NOT_FOUND
		});
	}
}


/**
 * Module for handling the HTTP routes
 * @module RouteHandler
 * @type {class}
 */
module.exports = new RouteHandler();
