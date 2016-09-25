'use strict';

module.exports = function autoupdate(server, done) {
  server
    .dataSources
    .pg
    .autoupdate()
    .then(function() {
      done();
    });
};
