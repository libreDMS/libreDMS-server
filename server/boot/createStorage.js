'use strict';
module.exports = function(server) {
  //console.dir(Object.keys(server.models.Container));
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
