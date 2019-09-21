/**
 * Entry point for the API. Configures middleware. Binds Controllers to routes.
 * Starts Express web server.
 */

require('rootpath')();//make all paths relative to the root directory.
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes middlewares
app.use('/users', require('./features/users/users.controller'));
//app.use('/', require('./features/users/users.controller'));
app.use('/issues', require('./features/issues/issues.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

