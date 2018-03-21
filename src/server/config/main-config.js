(function(appConfig) {

  'use strict';

  // *** main dependencies *** //
  const path = require('path');
  const bodyParser = require('body-parser');
  //const session = require('express-session');
  const morgan = require('morgan');
  const expressValidator = require('express-validator');

  // *** load environment variables *** //
  require('dotenv').config();

  appConfig.init = function(app, express) {

    // *** app middleware *** //
    if (process.env.NODE_ENV !== 'test') {
      app.use(morgan('dev'));
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressValidator());
    // // uncomment if using express-session
    // app.use(session({
    //   secret: process.env.SECRET_KEY,
    //   resave: false,
    //   saveUninitialized: true
    // }));
  };

})(module.exports);
