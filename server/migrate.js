'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

console.log('Starting migrate.js');
process.setMaxListeners(0);

app.start = function() {
  console.log('starting database migrations');
  app
    .dataSources
    .pg
    .autoupdate()
    .then(() => {
      console.log('finished database migrations');
      process.exit();
    })
    .catch(err => {
      console.error(err);
      process.exit();
    });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  console.log([require.main,module]);
  if ((require.main === module) || process.env.LOADED_MOCHA_OPTS)
    app.start();
});
