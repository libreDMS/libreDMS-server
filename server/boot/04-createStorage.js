'use strict';
module.exports = function(server) {
  server
    .models
    .Container
    .createContainer({
      name: 'Files'
    }, (err, res) => {
      if (err) {
        if (err.code === 'EEXIST') {
          return;
        } else {
          throw err;
        }
      }
    });
};
