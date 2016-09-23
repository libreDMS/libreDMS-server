'use strict';
module.exports = function(server) {
  server
    .loopback
    .Role
    .create({
      name: 'admin',
      description: 'administrative role for all the things',
    })
    .catch(err => {
      if (!((err.name === 'ValidationError') && (err.message.indexOf('`name` already exists (value: "admin")') > 0))) {
        throw err;
      }
    });
};
