var express = require('express'),
	mongoose = require('mongoose')
	bodyParser = require('body-parser');

var db;

if (process.env.ENV == 'Test') {
	db = mongoose.connect('mongodb://root:root@ds039155.mongolab.com:39155/books_dejan_test');
} else {
	db = mongoose.connect('mongodb://root:root@ds039195.mongolab.com:39195/books_dejan');
}

var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
	res.set('X-Powered-By', 'Book Store');
	next();
});
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);
// app.use('/api/authors', authorRouter);

app.use('/', function(req, res) {
	res.send('Welcome to my API!');
});

app.listen(8000, function() {
	console.log('Gulp is running my app on PORT: ' + port);
});

module.exports = app;