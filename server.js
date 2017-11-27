const request = require('request');
const express = require('express');
const app = express();
//var cors = require('cors');
//app.use(cors({credentials: true, origin: true}));
//app.options('*', cors());
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
	const message = 'hola mundo';
	res.render('index');
});
app.get('/data/*', (req, res) => {
	request.get("http://api.openweathermap.org" + req.url, {
 //   gzip: true,
      json: true
  	}, function(error, response, body) {
      if (!error && response.statusCode == 200) {
//      resolve(body);
		res.json(body);
      } else {
//      reject(error);
		res.error(error);
      }
    });

})
//http://api.openweathermap.org/data/2.5/forecast/daily?q=new%20york&units=imperial&cnt=7&appid=bcfbfcaf752dc3dc0f4547e42bd0d35b
//http://api.openweathermap.org/data/2.5/weather?q=new%20york&units=imperial&appid=bcfbfcaf752dc3dc0f4547e42bd0d35b
app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
