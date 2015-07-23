# express-bot
Crawler(robots) decision middleware for Express

# Use

```javascript
app.use(require('express-bot')({
  querystring: { // dicision using querystring  https://localhost?bot=1 -> hit!!
    use: true,
    key: 'bot',
    value: '1',
  }
}));
```

# Develop

```
$ make
```
