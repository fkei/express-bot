# express-bot
Crawler(robots) decision middleware for Express

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
