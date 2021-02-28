/**
 * AppConfig class file for setting up the Application configs
 * @class
 * 
 */
const bodyParser = require('body-parser');
const cors = require('cors');
const ExpressConfigModule = require('./express-config');

class AppConfig {
    constructor(app) {
        this.app = app;
    }

    /**
     * includeConfig() This method will load the Application and Express level configuration 
	 * @param {None}
     * @returns {None}
     * 
     */
    includeConfig() {
        this.loadAppLevelConfig();
        this.loadExpressConfig();
    }

    /**
     * loadAppLevelConfig()
	 * @param {None}
     * @returns {None}
     * 
     * @remarks
     * 
     * In this method can set up module specific configs, for e.g.
     *      1. Below we are using bodyParser's .json() method for accepting json payloads
     *         with the help of express middleware
     *      2. Here we can write Application level error handling and more module specific configs
     */
    loadAppLevelConfig() {
        this.app.use(
            cors()
        )
        this.app.use(
            bodyParser.json(),
            bodyParser.urlencoded({ extended: true }),
        );
    }

    /**
     * loadExpressConfig()
	 * @param {None}
     * @returns {None}
     * 
     * @remarks
     * In this method just calls the ExpressConfigModule class's constructor,
     * which initialtes the Express config setup
     */
    loadExpressConfig() {
        new ExpressConfigModule(this.app).setAppEngine();
    }
}


/**
 * Module for setting up the Application configs
 * @module AppConfig
 * @type {class}
 */
module.exports = AppConfig;
