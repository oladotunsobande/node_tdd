const mongoose = require('mongoose');

const AuthorSchema = require('../models/author');
const BookSchema = require('../models/book');

require('dotenv').config();

const connection = {};

connection.db = mongoose.createConnection(process.env.DB_URL, (err) => {
  if (err) throw err;
  console.log(`Mongo DB connection started on ${process.env.DB_URL}`);
});

connection.models = {};
connection.models.author = connection.db.model('Author', AuthorSchema);
connection.models.book = connection.db.model('Book', BookSchema);

module.exports = connection;