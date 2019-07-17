const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthorSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
  },
  { timestamps: true }
);

module.exports = AuthorSchema;