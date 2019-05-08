import { NextFunction, Request, Response } from 'express';

/**
 * @author fkei <kei.topaz@gmail.com>
 */
let BOTS: string[] = [
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
  additionalBots: Partial<string[]>;
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
  additionalBots: [],
};

const defaultAdditionalBots: Partial<string[]> = [];

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
 *   },
 *   additionalBots: [ // list of UA strings to be added to pre-defined BOTS.
 *     'MinorBot'
 *   ]
 * }));
 */
const expressBot = (options: Partial<Options> = {}) => {
  const opts = { ...defaultOptions, ...options };
  const querystring = { ...defaultQueryString, ...opts.querystring };
  const additionalBots = [ ...defaultAdditionalBots, ...opts.additionalBots ];

  let bots = BOTS;
  if (0 < additionalBots.length) {
    bots = Array.prototype.concat(bots, additionalBots);
  }

  const botRegExp = new RegExp('^.*(' + bots.join('|') + ').*$', 'i');

  return (req: Request, res: Response, next: NextFunction) => {
    if (querystring.use && req.query[querystring.key] && req.query[querystring.key] === querystring.value) {
      res.locals[querystring.key] = querystring.locals;
      next();
      return;
    }

    const ua = req.headers['user-agent'] || '';
    const decision = ua.match(botRegExp);

    if (decision) {
      res.locals[querystring.key] = decision;
    }
    next();
  };
};

export default expressBot;
