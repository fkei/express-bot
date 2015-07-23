'use strict';

/**
 * @author fkei <kei.topaz@gmail.com>
 * @name index.js <index.js>
 * @fileOverview Crawler(robots) decision middleware for Express
 */

var BOTS = [
  'Twitterbot',
  'Google Keyword Suggestion',
  'AdsBot-Google',
  'Googlebot',
  'applebot',
  'curl',
  'PycURL',
  //'Bot',
  'B-O-T',
  'Crawler',
  'Spider',
  'Spyder',
  'Yahoo',
  'ia_archiver',
  'facebookexternalhit',
  'baiduspider',
  'pingdom',
  'bingbot',
  'msnbot',
  'Twikle',
  'TweetmemeBot',
  'YandexBot',
  'Facebot',
  'Snappy',
  'Teoma',
  'NetResearchServer',
  'telegrambot',
  'slackbot',
  'linkedinbot',
  'slurp',
  'gurujibot',
  'UnwindFetchor',
  'Wotbox',
  'PaperLiBot',
  'WBSearchBot',
  'GSLFbot',
  'Ezooms',
  'AhrefsBot',
  'Covario-IDS',
  'findlinks',
  'DataparkSearch',
  'larbin',
  'Mediapartners-Google',
  'NG-Search',
  'Jeeves',
  'Charlotte',
  'NewsGator',
  'TinEye',
  'Cerberian',
  'SearchSight',
  'Zao',
  'Scrubby',
  'Qseero',
  'Pompos',
  'oegp',
  'SBIder',
  'yoogliFetchAgent',
  'yacy',
  'webcollage',
  'VYU2',
  'voyager',
  'updated',
  'truwoGPS',
  'StackRambler',
  'Sqworm',
  'silk',
  'semanticdiscovery',
  'ScoutJet',
  'Nymesis',
  'MVAClient',
  'mogimogi',
  'Mnogosearch',
  'Arachmo',
  'Accoona',
  'holmes',
  'htdig',
  'ichiro',
  'webis',
  'LinkWalker',
  'lwp-trivial'
];

/**
 * Express middleware
 * @param options
 * @returns {Function}
 * @example
 *
 * app.use(require('express-bot')({
 *   querystring: { // dicision using querystring  https://localhost?bot=1 -> hit!!
 *     use: true,
 *     key: 'bot',
 *     value: '1',
 *   }
 * }));
 */
module.exports = function expressBot(options) {
  options = options || {};
  options.querystring = options.querystring || {};
  options.querystring.use = options.querystring.use || false;
  options.querystring.key = options.querystring.key || 'bot';
  options.querystring.value = options.querystring.value || '1';
  options.querystring.locals = options.querystring.locals || ['querystring', options.querystring.key, options.querystring.value];

  var BOT_REGEXP = new RegExp('^.*(' + BOTS.join('|') + ').*$', 'i');

  return function(req, res, next) {

    if (options.querystring.use && req.query[options.querystring.key] && req.query[options.querystring.key] === options.querystring.value) {
      res.locals[options.querystring.key] = options.querystring.locals;
      next();
      return;
    }

    var ua = req.headers['user-agent'] || '';
    var decision = ua.match(BOT_REGEXP);

    if (decision) {
      res.locals[options.querystring.key] = decision;
    }
    next();
  };
};

