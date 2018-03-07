# express-bot

[![GitHub license](https://img.shields.io/github/license/fkei/express-bot.svg)](https://github.com/fkei/express-bot/blob/master/LICENSE)

[![GitHub release](https://img.shields.io/github/release/fkei/express-bot.svg)]()
[![GitHub last commit](https://img.shields.io/github/last-commit/fkei/riexpress-bototx.svg)]()
![Travis CI](https://img.shields.io/travis/fkei/express-bot/master.svg)

[![NPM](https://nodei.co/npm/express-bot.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/express-bot/)


Crawler(robots) decision middleware for Express


# Install

```
$ npm install --save express-bot
```

# UserAgent's

[https://github.com/fkei/express-bot/blob/master/index.js#L9](https://github.com/fkei/express-bot/blob/master/index.js#L9)

# Use

```javascript
app.use(require('express-bot')({
  querystring: { // dicision using querystring  https://localhost?bot=1 -> hit!!
    use: true,
    key: 'bot',
    value: '1',
    locals: ...
  }
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
