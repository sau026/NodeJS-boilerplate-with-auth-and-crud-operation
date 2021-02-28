/**
 * [Lib] Level Imports Starts
 */
const express = require('express');

/**
 * App Level Imports Starts
 */
const AppConfig = require('./config/app-config');
const Routes = require('./web/routes');

/**
 * Server class file for setting up the Application Server
 */
class Server {
    constructor() {
        // Creating an Object of the express app
        this.app = express();
    }

    appConfig() {
        //Loading the config for the Node Application
        new AppConfig(this.app).includeConfig();
    }

    /* Including app Routes starts */
    includeRoutes() {
        new Routes(this.app).routesConfig();
    }
    /* Including app Routes ends */

    startTheServer() {
        this.appConfig();
        this.includeRoutes();

        const port = process.env.PORT;
        const host = process.env.HOST;
        
        // Firing up the server
        this.app.listen(port, () => {
            console.log(`Listening on http://${host}:${port}`);
        });
    }
}

module.exports = new Server();
