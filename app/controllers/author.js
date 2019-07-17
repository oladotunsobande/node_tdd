const connection = require('../config/db');

const Author = connection.models.author;

// Create new author
exports.createAuthor = async (req, res) => {
  try{
    const {
      firstName,
      lastName,
      email
    } = req.body;

    if(firstName == undefined) return res.status(400).json({ status: false, message: 'firstName is required' });
    if(lastName == undefined) return res.status(400).json({ status: false, message: 'lastName is required' });
    if(email == undefined) return res.status(400).json({ status: false, message: 'email is required' });

    const author = await Author.findOne({ email });
    if(author){
      res.status(400).json({ status: false, message: 'Email exists' });
      return;
    }

    const new_author = await Author.create({
      firstName,
      lastName,
      email
    });

    res.json({ 
      status: true, 
      message: 'Author created successfully',
      data: new_author
    });
  } catch(error){
    console.error(error);
    res.status(500).json({ status: false, error });
  }
};

// Get author by id
exports.getAuthorById = async (req, res) => {
  try{
    const { id } = req.query;

    if(id == undefined) return res.status(400).json({ status: false, message: 'id is required' });

    const author = await Author.findById(id);
    if(!author){
      res.status(404).json({ status: false, message: 'Not found' });
      return;
    }

    res.json({ status: true, data: author });
  } catch(error){
    console.error(error);
    res.status(500).json({ status: false, error });
  }
};

// Get author by email
exports.getAuthorByEmail = async (req, res) => {
  try{
    const { email } = req.query;

    if(email == undefined) return res.status(400).json({ status: false, message: 'email is required' });

    const author = await Author.findOne({ email });
    if(!author){
      res.status(404).json({ status: false, message: 'Not found' });
      return;
    }

    res.json({ status: true, data: author });
  } catch(error){
    console.error(error);
    res.status(500).json({ status: false, error });
  }
};

// Get all authors
exports.getAllAuthors = async (req, res) => {
  try{
    const authors = await Author.find();

    res.json({ status: true, data: authors });
  } catch(error){
    console.error(error);
    res.status(500).json({ status: false, error });
  }
};