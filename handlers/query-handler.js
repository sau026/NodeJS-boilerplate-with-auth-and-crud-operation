const CONSTANTS = require('./../constants');
const { ObjectId } = require('mongodb');

/**
 * QueryHandler class for executing MongoDB queries
 * @class
 */
class QueryHandler {
	constructor() {
		this.Mongodb = require("./../config/db");
	}

	checkUser(username, password) {
		return new Promise(async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				// DB.collection(CONSTANTS.MONGODB_USER_COLLECTION_NAME).find({
				// 	"username":username,
				// 	"password":password
				// }.toArray(function (err, result){
				// 	DB.close();
				// 	if(err){
				// 		reject(err);
				// 	} else if(result === 0){
				// 		reject(CONSTANTS.INVALID_CREDENTIALS)
				// 	}
				// 	resolve(result);
				// }))

				const allUSer = DB.collection(CONSTANTS.MONGODB_USER_COLLECTION_NAME)
				allUSer.find({
					"username": username,
					"password": password
				}).toArray(function (err, result) {
					DB.close();
					if (err) {
						reject(err);
					} else if (result.length === 0) {
						reject(CONSTANTS.INVALID_CREDENTIALS)
					}
					resolve(result);
				})

			} catch (error) {
				reject(error)
			}
		})
	}

	registerUser(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection(CONSTANTS.MONGODB_USER_COLLECTION_NAME).insertOne(data, async (err, result) => {
					DB.close();
					if (err) {
						reject(err);
					}
					resolve(result.insertedId);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	addStudent(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection(CONSTANTS.MONGODB_STUDENT_COLLECTION_NAME).insertOne(data, async (err, result) => {
					DB.close();
					if (err) {
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
	getAllUser() {
		return new Promise(async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				const allUSer = DB.collection(CONSTANTS.MONGODB_USER_COLLECTION_NAME)
				allUSer.find({}).toArray(function (err, result) {
					DB.close();
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				})
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
	getAllStudent() {
		return new Promise(async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				const allUSer = DB.collection(CONSTANTS.MONGODB_STUDENT_COLLECTION_NAME)
				allUSer.find({}).toArray(function (err, result) {
					DB.close();
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				})
			} catch (error) {
				reject(error)
			}
		});
	}

	deleteStudent(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const params = {
					_id: ObjectId(data)
				}
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection(CONSTANTS.MONGODB_STUDENT_COLLECTION_NAME).deleteOne(params, async (err, result) => {
					DB.close();
					if (err) {
						reject(err);
					}
					resolve(result.deletedCount);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	deleteUser(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const params = {
					_id: ObjectId(data)
				}
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection(CONSTANTS.MONGODB_USER_COLLECTION_NAME).deleteOne(params, async (err, result) => {
					DB.close();
					if (err) {
						reject(err);
					}
					resolve(result.deletedCount);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	updateStudent(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const id = {
					_id: ObjectId(data.id)
				}
				const updateValue = {
				}
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection(CONSTANTS.MONGODB_STUDENT_COLLECTION_NAME).updateOne(id,
					{
						$set: {
							"name": data.name,
							"standard": data.standard,
							"passingYear": data.passingYear,
							"percentage": data.percentage,
						}
					},
					async (err, result) => {
						DB.close();
						if (err) {
							reject(err);
						}
						resolve(result);
					});
			} catch (error) {
				reject(error)
			}
		});
	}

	updateUser(userData) {
		return new Promise(async (resolve, reject) => {
			try {
				const id = {
					_id: ObjectId(userData._id)
				}
				const updateValue = {
				}
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection(CONSTANTS.MONGODB_USER_COLLECTION_NAME).updateOne(id,
					{
						$set: {
							"username": userData.username,
							"password": userData.password,
							"email": userData.email
						}
					},
					async (err, result) => {
						DB.close();
						if (err) {
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