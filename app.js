var express = require('express');
var app = express();

//static files
app.use(express.static('./public'));

var routes = require('./routes/index');

//setup template engine
app.set('view engine','ejs');

routes(app);

app.listen(8080);
console.log('Listening to PORT 8080');