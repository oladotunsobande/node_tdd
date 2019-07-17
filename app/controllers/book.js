const connection = require('../config/db');

const Book = connection.models.book;

// Add new book
exports.addBook = async (req, res) => {
  try{
    const {
      author,
      title,
      isbn,
      publishDate,
    } = req.body;

    if(author == undefined) return res.status(400).json({ status: false, message: 'author is required' });
    if(title == undefined) return res.status(400).json({ status: false, message: 'title is required' });
    if(isbn == undefined) return res.status(400).json({ status: false, message: 'isbn is required' });
    if(publishDate == undefined) return res.status(400).json({ status: false, message: 'publishDate is required' });

    const book = await Book.findOne({ isbn });
    if(book){
      res.status(400).json({ status: false, message: 'ISBN exists' });
      return;
    }

    const new_book = await Book.create({
      author,
      title,
      isbn,
      publishDate: new Date(publishDate)
    });

    res.json({ 
      status: true, 
      message: 'Book added successfully',
      data: new_book
    });
  } catch(error){
    console.error(error);
    res.status(500).json({ status: false, error });
  }
};

// Get book by id
exports.getBookById = async (req, res) => {
  try{
    const { id } = req.query;

    if(id == undefined) return res.status(400).json({ status: false, message: 'id is required' });

    const book = await Book.findById(id);
    if(!book){
      res.status(404).json({ status: false, message: 'Not found' });
      return;
    }

    res.json({ status: true, data: book });
  } catch(error){
    console.error(error);
    res.status(500).json({ status: false, error });
  }
};

// Get book by ISBN
exports.getBookbyISBN = async (req, res) => {
  try{
    const { isbn } = req.query;

    if(isbn == undefined) return res.status(400).json({ status: false, message: 'isbn is required' });

    const book = await Book.findOne({ isbn });
    if(!book){
      res.status(404).json({ status: false, message: 'Not found' });
      return;
    }

    res.json({ status: true, data: book });
  } catch(error){
    console.error(error);
    res.status(500).json({ status: false, error });
  }
};

// Get books by author
exports.getBooksByAuthor = async (req, res) => {
  try{
    const { authorId } = req.query;

    if(authorId == undefined) return res.status(400).json({ status: false, message: 'authorId is required' });

    const books = await Book.find({ author: authorId });
    if(!books){
      res.status(404).json({ status: false, message: 'Not found' });
      return;
    }

    res.json({ status: true, data: books });
  } catch(error){
    console.error(error);
    res.status(500).json({ status: false, error });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try{
    const books = await Book.find().populate('author', '_id firstName lastName email');

    res.json({ status: true, data: books });
  } catch(error){
    console.error(error);
    res.status(500).json({ status: false, error });
  }
};