const express = require('express');
const router = express.Router();

const AuthorController = require('../controllers/author');

// Create new author
router.post('/', AuthorController.createAuthor);

// Get author by id
router.get('/:id', AuthorController.getAuthorById);

// Get author by email
router.get('/:email', AuthorController.getAuthorByEmail);

// Get all authors
router.get('/', AuthorController.getAllAuthors);

module.exports = router;