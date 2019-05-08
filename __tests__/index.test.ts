import expressBot from '../src';
import httpMocks from 'node-mocks-http';

describe('Middleware', () => {
  describe('Bot access', () => {
    let request: any;
    let response: any;

    beforeEach(done => {
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/bot',
        query: {
          myid: '312',
        },
      });
      response = httpMocks.createResponse();
      response.locals = {};
      done();
    });

    it('Argument(options) not set', done => {
      var fn = expressBot();
      request.headers['user-agent'] = 'Googlebot';
      fn(request, response, () => {
        expect(response.locals.bot).toBeTruthy();
        done();
      });
    });

    it('Set arguments(options)', done => {
      var fn = expressBot({
        querystring: {
          use: true,
        },
      });
      request.headers['user-agent'] = 'Googlebot';
      fn(request, response, () => {
        expect(response.locals.bot).toBeTruthy();
        done();
      });
    });

    it('Set arguments and define `locals` variables (object)', done => {
      var fn = expressBot({
        querystring: {
          use: true,
          key: 'test',
          value: 'yes',
          locals: {
            hello: 'hello :P',
          },
        },
      });
      request.headers['user-agent'] = 'no-bot';
      request.query.test = 'yes';

      fn(request, response, () => {
        expect(response.locals.test.hello).toBe('hello :P');
        done();
      });
    });

    it('Set arguments and define `locals` variables (string)', done => {
      var fn = expressBot({
        querystring: {
          use: true,
          key: 'test',
          value: 'yes',
          locals: 'hello :P',
        },
      });
      request.headers['user-agent'] = 'no-bot';
      request.query.test = 'yes';

      fn(request, response, () => {
        expect(response.locals.test).toBe('hello :P');
        done();
      });
    });
  });

  describe('Non-bot access', () => {
    let request: any;
    let response: any;

    beforeEach(done => {
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/bot',
        query: {
          myid: '312',
        },
      });
      response = httpMocks.createResponse();
      response.locals = {};
      done();
    });

    it('Argument(options) not set', done => {
      var fn = expressBot({});
      request.headers['user-agent'] = 'no-bot';
      fn(request, response, () => {
        expect(response.locals.bot).toBeFalsy();
        done();
      });
    });

    it('Set arguments(options)', done => {
      var fn = expressBot({
        querystring: {
          use: true,
        },
      });
      request.headers['user-agent'] = 'no-bot';
      fn(request, response, () => {
        expect(response.locals.bot).toBeFalsy();
        done();
      });
    });

    it('Set arguments and define `locals` variables (string)', done => {
      var fn = expressBot({
        querystring: {
          use: true,
          key: 'test',
          value: 'yes',
          locals: 'data',
        },
      });
      request.headers['user-agent'] = 'no-bot';
      request.query.test = 'no';

      fn(request, response, () => {
        expect(response.locals.bot).toBeFalsy();
        expect(response.locals.test).toBeUndefined();
        done();
      });
    });
  });
});
