var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const author = require('./app/routes/author');
const book = require('./app/routes/book');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/author', author);
app.use('/api/book', book);

app.use(function (req, res, next) {
  res.status(404);
  res.send({ error: 'API Not found' });
  return;
});

module.exports = app;
