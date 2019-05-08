import { NextFunction, Request, Response } from 'express';

/**
 * @author fkei <kei.topaz@gmail.com>
 */
const BOTS = [
  'Twitterbot',
  'Google Keyword Suggestion',
  'AdsBot-Google',
  'Googlebot',
  'applebot',
  'curl',
  'PycURL',
  // 'Bot',
  'B-O-T',
  'Crawler',
  'Spider',
  'Spyder',
  'Yahoo',
  'ia_archiver',
  'facebookexternalhit',
  'facebookplatform',
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
  'lwp-trivial',
  'nanagogo-bot',
  'GoogleCloudMonitoring-UptimeChecks',
  'Stackdriver_terminus_bot',
];

interface QueryString {
  use: boolean;
  key: string;
  value: string;
  locals: object | string;
}

interface Options {
  querystring: Partial<QueryString>;
}

const defaultQueryString: QueryString = {
  use: true,
  // tslint:disable-next-line: object-literal-sort-keys
  key: 'bot',
  value: '1',
  locals: {},
};

const defaultOptions: Options = {
  querystring: {},
};

/**
 * Express middleware
 * @param options Partial<Options>
 * @returns {Function}
 * @example
 *
 * app.use(require('express-bot')({
 *   querystring: { // dicision using querystring  https://localhost?bot=1 -> hit!!
 *     use: true,
 *     key: 'bot',
 *     value: '1',
 *     locals: {}
 *   }
 * }));
 */

const expressBot = (options: Partial<Options> = {}) => {
  const opts = { ...defaultOptions, ...options };
  const querystring = { ...defaultQueryString, ...opts.querystring };

  const BOT_REGEXP = new RegExp('^.*(' + BOTS.join('|') + ').*$', 'i');

  return (req: Request, res: Response, next: NextFunction) => {
    if (querystring.use && req.query[querystring.key] && req.query[querystring.key] === querystring.value) {
      res.locals[querystring.key] = querystring.locals;
      next();
      return;
    }

    const ua = req.headers['user-agent'] || '';
    const decision = ua.match(BOT_REGEXP);

    if (decision) {
      res.locals[querystring.key] = decision;
    }
    next();
  };
};

export default expressBot;
