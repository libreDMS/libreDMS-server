'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

console.log('Starting democontent.js');
process.setMaxListeners(0);

app.start = function() {
  console.log('loading democontent');
  app.loadFixtures()
    .then(function() {
      console.log('Done!');
    })
    .catch(function(err) {
      console.log('Errors:', err);
    });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if ((require.main === module) || process.env.LOADED_MOCHA_OPTS)
    app.start();
});
