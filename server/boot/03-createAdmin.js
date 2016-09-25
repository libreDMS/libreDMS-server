'use strict';
module.exports = function(server, done) {
  var prom = server
      .models
      .Role
      .create({
        name: 'admin',
        description: 'administrative role for all the things',
      })
      .then(function(role) {
        return server
          .models
          .User
          .create({
            'username': 'admin',
            'email': 'admin@example.com',
            'password': '123456',
          });
      })
      .then(function(user) {
        done();
      })
      .catch(function(err) {
        if (!(
          (err.name === 'ValidationError') &&
            (err.message.indexOf('`name` already exists (value: "admin")') > 0)
        )) {
          throw err;
        }
      });
};
