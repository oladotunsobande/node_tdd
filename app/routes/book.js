const express = require('express');
const router = express.Router();

const BookController = require('../controllers/book');

// Add new book
router.post('/', BookController.addBook);

// Get book by id
router.get('/:id', BookController.getBookById);

// Get book by ISBN
router.get('/:isbn', BookController.getBookbyISBN);

// Get books by author
router.get('/:authorId', BookController.getBooksByAuthor);

// Get all books
router.get('/', BookController.getAllBooks);

module.exports = router;