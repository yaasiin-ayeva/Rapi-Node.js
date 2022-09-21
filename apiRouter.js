// Imports
var express = require('express');
var usersController    = require('./routes/usersController');

// Router
exports.router = (() => {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(usersController.register);
    apiRouter.route('/users/login/').post(usersController.login);

    return apiRouter;
})();