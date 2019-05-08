import httpMocks from 'node-mocks-http';
import expressBot from '../src';

describe('Middleware', () => {
  describe('Bot access', () => {
    let request: any;
    let response: any;

    beforeEach(done => {
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/bot',
        // tslint:disable-next-line: object-literal-sort-keys
        query: {
          myid: '312',
        },
      });
      response = httpMocks.createResponse();
      response.locals = {};
      done();
    });

    it('Argument(options) not set', done => {
      const fn = expressBot();
      request.headers['user-agent'] = 'Googlebot';
      fn(request, response, () => {
        expect(response.locals.bot).toBeTruthy();
        done();
      });
    });

    it('Set arguments(options)', done => {
      const fn = expressBot({
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
      const fn = expressBot({
        querystring: {
          use: true,
          // tslint:disable-next-line: object-literal-sort-keys
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
      const fn = expressBot({
        querystring: {
          use: true,
          // tslint:disable-next-line: object-literal-sort-keys
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

    it('Add bot definition (additionalBots)', done => {
      const fn = expressBot({
        additionalBots: ['MinorBot'],
      });
      request.headers['user-agent'] = 'MinorBot';
      fn(request, response, () => {
        expect(response.locals.bot).toBeTruthy();
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
        // tslint:disable-next-line: object-literal-sort-keys
        query: {
          myid: '312',
        },
      });
      response = httpMocks.createResponse();
      response.locals = {};
      done();
    });

    it('Argument(options) not set', done => {
      const fn = expressBot({});
      request.headers['user-agent'] = 'no-bot';
      fn(request, response, () => {
        expect(response.locals.bot).toBeFalsy();
        done();
      });
    });

    it('Set arguments(options)', done => {
      const fn = expressBot({
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
      const fn = expressBot({
        querystring: {
          use: true,
          // tslint:disable-next-line: object-literal-sort-keys
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

    it('Add bot definition (additionalBots)', done => {
      const fn = expressBot({
        additionalBots: ['MinorBot'],
      });
      request.headers['user-agent'] = 'no-bot';
      fn(request, response, () => {
        expect(response.locals.bot).toBeFalsy();
        done();
      });
    });

    ///
  });
});
