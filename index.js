/**
 * [Lib] Level Imports Starts
 */
const DotEnv = require('dotenv');

/**
 * Loading the .env file configuration
 */
DotEnv.config();

try {
    /**
     * Making method call to start the Nodejs Server
     */
    const Server = require('./server');
    Server.startTheServer();
} catch (error) {
    console.log("Unable to start the Server =>", error)
}