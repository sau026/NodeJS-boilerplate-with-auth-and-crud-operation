const CONSTANTS = require('./../constants');
const { ObjectId } = require('mongodb');

/**
 * QueryHandler class for executing MongoDB queries
 * @class
 */
class QueryHandler{
	constructor(){
		this.Mongodb = require("./../config/db");
	}

	checkUser(username, password){
		return new Promise( async (resolve, reject) => {
			try{
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection(CONSTANTS.MONGODB_USER_COLLECTION_NAME).find({
					"username":username,
					"password":password
				}).count((err, result)=>{
					DB.close();
					if(err){
						reject(err);
					} else if(result === 0){
						reject(CONSTANTS.INVALID_CREDENTIALS)
					}
					resolve(result);
				})
			} catch (error){
				reject(error)
			}
		})
	}

	registerUser(data){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection(CONSTANTS.MONGODB_USER_COLLECTION_NAME).insertOne(data, async (err, result) =>{
					DB.close();
					if( err ){
						reject(err);
					}
					resolve(result.insertedId);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}

	  /**
	 * Responsible for getting all users the user into database
	 * @param {Object} email, password
	 * @returns {Promise} Object
	 */
    getAllUser(username){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection(CONSTANTS.MONGODB_USER_COLLECTION_NAME).find({
					"username": username
				}).count( (err, result) =>{
					DB.close();
					if( err ){
						reject(err);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}

}


/**
 * Module for executing MongoDB queries
 * @module QueryHandler
 * @type {class}
 */
module.exports = new QueryHandler();