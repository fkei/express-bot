# express-bot

[![GitHub license](https://img.shields.io/github/license/fkei/express-bot.svg)](https://github.com/fkei/express-bot/blob/master/LICENSE)
![Github All Releases](https://img.shields.io/github/downloads/fkei/express-bot/total.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/fkei/express-bot.svg)
![Travis CI](https://img.shields.io/travis/fkei/express-bot/master.svg)

[![NPM](https://nodei.co/npm/express-bot.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/express-bot/)

Crawler(robots) decision middleware for Express

# Install

```
$ npm install --save express-bot
```

# UserAgent's

- `Twitterbot`
- `Google Keyword Suggestion`
- `AdsBot-Google`
- `Googlebot`
- `applebot`
- `curl`
- `PycURL`
- ....


> ALL Bots List -> [https://github.com/fkei/express-bot/blob/master/index.js#L9](https://github.com/fkei/express-bot/blob/master/index.js#L9)

# Use

```javascript
app.use(require('express-bot')({
  // force dicision using querystring  https://localhost?bot=1 -> hit!!
  querystring: {
    use: true,
    key: 'bot',
    value: '1',
    locals: ...
  // list of UA strings to be added to pre-defined BOTS.
  },
  additionalBots: [
    'MinorBot'
  ]
}));
```

> options (Optional)

# Develop

### eslint

```
$ npm run eslint
```

### test

```
$ npm test
```
