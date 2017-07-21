const express = require('express');
const app = express();
var cors = require('cors');
app.use(express.static('public'));	
app.use(cors({credentials: true, origin: true}));
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

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
