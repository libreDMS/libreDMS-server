'use strict';

var app, token, document, connection;

var assert = require('assert');
var request = require('supertest-as-promised');
var expect = require('chai').expect;
var Promise = require('bluebird');
var execFile = Promise.promisify(require('child_process').execFile);
var pg = require('pg');

describe('Testing document creation', function() {
  before('before creating documents', function(done) {
    var config = {
      host: 'db',
      port: 5432,
      database: 'postgres',
      password: '',
      user: 'postgres',
    };

    var client = new pg.Client();

    client.connect(function(err) {
      if (err) throw err;

      // execute a query on our database
      client.query('CREATE DATABASE libredms_test', function(err, result) {
        console.dir(err);
        if (err) throw err;
      });
    });
  });

  after(function(done) {
    this.timeout(20000);
    app.datasources.pg.disconnect();

    client.query('DROP DATABASE libredms_test', function(err, result) {
      if (err) throw err;

      done();
    });
  });

  describe('get a login token', function() {
    it('retrieve token', function() {
      return request(app)
        .post('/api/Users/login')
        .send({
          'username': 'admin',
          'password': '123456',
        })
        .expect(200)
        .then(function(res) {
          var body = res.body;

          expect(body).to.be.an('object');
          expect(body.id).to.be.a('string');
          expect(body.ttl).to.be.a('number');
          expect(body.userId).to.be.a('number');

          token = body.id;
        })
        .catch(function(err) {
          console.error(err);
        });
    });
  });

  describe('create a document', function() {
    it('post document', function() {
      return request(app)
        .post('/api/Documents')
        .send({
          'name': 'Test',
          'author': 'author',
          'date': '2016-09-24T21:39:00+02:00',
        })
        .expect(200)
        .then(function(res) {
          var body = res.body;

          expect(body).to.be.an('object');
          expect(body.id).to.be.a('number');
          expect(body.id).to.be.equal(1);
          expect(body.author).to.be.a('string');
          expect(body.author).to.be.equal('author');
          expect(body.date).to.be.a('string');
          expect(body.date).to.be.equal('2016-09-24T19:39:00.000Z');
          expect(body.name).to.be.a('string');
          expect(body.name).to.be.equal('Test');
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  });
});
