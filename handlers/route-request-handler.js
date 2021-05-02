const CONSTANTS = require('./../constants');
const RouteResponseHandler = require('./../handlers/response-handler');
const queryHandler = require('./query-handler');
const jwt = require("jsonwebtoken")
const path = require('path');
const { query } = require('express');

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
				await queryHandler.checkUser(username, password);
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
	async registerUser(request, response, next){
		const username = request.body.username;
		const password = request.body.password;
		const email = request.body.email;
		// const image = request.file.path

		if(!username || username === '') {
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.USERNAME_NOT_FOUND,
				response: null,
			});
		} else if(!password || password === '') {
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.PASSWORD_NOT_FOUND,
				response: null,
			});
		} else if(!email || email === '') {
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.EMAIL_NOT_FOUND,
				response: null,
			});
		} 
		else {		
			try {
				const data = {
					username,
					password,
					email,
					// image
				}
				await queryHandler.registerUser(data);
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_OK_HTTP_CODE,
					statusText: CONSTANTS.SERVER_OK_HTTP_TEXT,
					isOkay: true,
					message: CONSTANTS.REGISTRATION_SUCESS,
				});
								
			} catch (error) {
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE,
					statusText: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_TEXT,
					isOkay: false,
					message: CONSTANTS.SERVER_ERROR_MESSAGE,
				});
			}
		}
	}

	async getAllUser(request, response){
			try{
				const result = await queryHandler.getAllUser();
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_OK_HTTP_CODE,
					statusText: CONSTANTS.SERVER_OK_HTTP_TEXT,
					isOkay: true,
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

	/**
	 * Responsible for editing user from DB
	 * @param {expressRequestObject} request
	 * @param {expressResponseObject} response
	 */
	async updateUser(request, response){
		const userData = request.body;
		if(!userData._id || userData._id === ''){
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.INVALID_PARAMETER,
				response: null,
			})
		} else if(!userData.username || userData.username === '') {
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.USERNAME_NOT_FOUND,
				response: null,
			});
		} else if(!userData.password || userData.password === '') {
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.PASSWORD_NOT_FOUND,
				response: null,
			});
		} else if(!userData.email || userData.email === '') {
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.EMAIL_NOT_FOUND,
				response: null,
			});
		} else{
			try{
				const result = await queryHandler.updateUser(userData);
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_OK_HTTP_CODE,
					statusText: CONSTANTS.SERVER_OK_HTTP_TEXT,
					isOkay: true,
					message: CONSTANTS.UPDATE_SUCESS,
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

	/**
	 * Responsible for deleting user from DB
	 * @param {expressRequestObject} request
	 * @param {expressResponseObject} response
	 */
	async deleteUser(request, response){
		const _id = request.body.id;
		if(!_id || _id === ''){
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.INVALID_PARAMETER,
				response: null,
			})
		} else{
			try{
				const result = await queryHandler.deleteUser(_id);
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_OK_HTTP_CODE,
					statusText: CONSTANTS.SERVER_OK_HTTP_TEXT,
					isOkay: true,
					message: CONSTANTS.DELETION_SUCESS,
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
