const path = require('path');
const express = require('express');
/**
 * ExpressConfig class file for setting up the express related configuration
 * @class
 * 
 * @remarks
 * Note:  Here we can write various express related configuration, such as
 *        1. Setting up view engine
 *        2. Specifing the Public path 
 */
class ExpressConfig {
  /**
   * constructor()
   * @param {None}
   * @returns {None}
   * 
   * @remarks
   * 	setting the instance of the express Object.
   */
  constructor(app) {
    this.app = app;
  }

  /**
   * setAppEngine()
   * @param {None}
   * @returns {None}
   * 
   * @remarks
   * 	This method will set up the view engine and Specify the Public path 
   */ 
  setAppEngine() {
    this.app.use('/public', express.static(path.join(__dirname, '/../public')));
  }
}

/**
 * Module for setting up the express related configuration
 * @module ExpressConfig
 * @type {class}
 */
module.exports = ExpressConfig;
