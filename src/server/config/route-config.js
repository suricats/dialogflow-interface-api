(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const actionRoutes = require('../routes/actions');

    // *** register routes *** //
    app.use('/api/v1/actions', actionRoutes);

  };

})(module.exports);
