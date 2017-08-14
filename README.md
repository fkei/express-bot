# express-bot

<a href="LICENSE">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="Software License" />
</a>
<a href="https://github.com/fkei/express-bot/issues">
  <img src="https://img.shields.io/github/issues/fkei/express-bot.svg" alt="Issues" />
</a>
<a href="http://standardjs.com/">
  <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="JavaScript Style Guide" />
</a>
<a href="https://npmjs.org/package/express-bot">
  <img src="https://img.shields.io/npm/v/express-bot.svg?style=flat-squar" alt="NPM" />
</a>
<a href="https://github.com/fkei/express-bot/releases">
  <img src="https://img.shields.io/github/release/fkei/express-bot.svg" alt="Latest Version" />
</a>


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
