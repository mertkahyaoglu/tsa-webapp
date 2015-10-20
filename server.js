var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var port       = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', __dirname + '/views')
app.set('view engine', 'jade');
app.use('/', require('./routes').router);

app.listen(port);
console.log('Server running on port: ' + port);
