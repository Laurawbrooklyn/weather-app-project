const request = require('request');
const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('public'));
const expressNunjucks = require('express-nunjucks');
const isDev = app.get('env') === 'development';
app.set('views', __dirname + '/templates');

const njk = expressNunjucks(app, {
  watch: isDev,
  noCache: isDev
});

app.get("/", (req, res) => {
  res.render('index');
});
app.get('/data/*', (req, res) => {
  request.get("http://api.openweathermap.org" + req.url, {
    json: true
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {

      res.json(body);
    } else {
      console.log(error)
      res.status(500).json(error);
    }
  });
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
