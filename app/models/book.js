const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
    },
    title: { type: String },
    isbn: { type: String },
    publishDate: { type: Date }
  },
  { timestamps: true }
);

module.exports = BookSchema;