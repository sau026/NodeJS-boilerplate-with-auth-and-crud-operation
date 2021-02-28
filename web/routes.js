
const routeHandler = require('./../handlers/route-request-handler');
var VerifyToken = require('../auth/verifyToken');

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
		this.app.post('/register', routeHandler.registerUser);
		this.app.get('/getAllUser',VerifyToken, routeHandler.getAllUser);
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