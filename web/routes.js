
const routeHandler = require('./../handlers/route-request-handler');
var VerifyToken = require('../auth/verifyToken');
var uploadFile = require('../config/upload')

class Routes{

	constructor(app){
		/**
		 * Getting the instance of the express Object.
		 */
		this.app = app;
	}

	/**
	 * Registering the routes.
	 */
	appRoutes(){
		this.app.post('/login', routeHandler.checkUser);
		this.app.post('/register', uploadFile.upload.single('image'), routeHandler.registerUser);
		this.app.get('/getAllUser', VerifyToken, routeHandler.getAllUser);
		this.app.put('/updateUser', VerifyToken, routeHandler.updateUser);
		this.app.post('/deleteUser', VerifyToken, routeHandler.deleteUser);
		/**
		 * Handling 404 Route
		 */
		this.app.get('*', routeHandler.routeNotFoundHandler);		
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;