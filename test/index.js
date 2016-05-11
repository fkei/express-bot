var httpMocks = require('node-mocks-http');
var mocha = require('mocha');
var assert = require('chai').assert;

var middleware = require('../index');

var request = {};
var response = {};

describe('Middleware test', function(){

  context('bot [YES]', function() {

    beforeEach(function(done) {
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/bot',
        query: {
          myid: '312'
        }
      });
      response = httpMocks.createResponse();
      response.locals = {};
      done();
    });

    it('not options', function(done) {
      var fn = middleware({});
      request.headers['user-agent'] = 'Googlebot';
      fn(request, response, function() {
        assert.equal(!!response.locals.bot, true);
        done();
      });
    });

    it('options.use', function(done) {
      var fn = middleware({
        querystring: {
          use: true
        }
      });
      request.headers['user-agent'] = 'Googlebot';
      fn(request, response, function() {
        assert.equal(!!response.locals.bot, true);
        done();
      });
    });

    it('options use and querystring', function(done) {
      var fn = middleware({
        querystring: {
          use: true,
          key: "test",
          value: "yes",
          locals: "data"
        }
      });
      request.headers['user-agent'] = 'no-bot';
      request.query.test = "yes";

      fn(request, response, function() {
        assert.equal(!!response.locals.test, true);
        assert.equal(response.locals.test, 'data');
        done();
      });
    });

  });


  context('bot [NO]', function() {

    beforeEach(function(done) {
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/bot',
        query: {
          myid: '312'
        }
      });
      response = httpMocks.createResponse();
      response.locals = {};
      done();
    });

    it('not options', function(done) {
      var fn = middleware({});
      request.headers['user-agent'] = 'no-bot';
      fn(request, response, function() {
        assert.equal(!!response.locals.bot, false);
        done();
      });
    });

    it('options.use', function(done) {
      var fn = middleware({
        querystring: {
          use: true
        }
      });
      request.headers['user-agent'] = 'no-bot';
      fn(request, response, function() {
        assert.equal(!!response.locals.bot, false);
        done();
      });
    });

    it('options use and querystring', function(done) {
      var fn = middleware({
        querystring: {
          use: true,
          key: "test",
          value: "yes",
          locals: "data"
        }
      });
      request.headers['user-agent'] = 'no-bot';
      request.query.test = "no";

      fn(request, response, function() {
        assert.equal(!!response.locals.test, false);
        assert.equal(response.locals.test, null);
        done();
      });
    });

  });

});
