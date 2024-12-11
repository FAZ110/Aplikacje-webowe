const express = require('express');
const Book = require('../models/book');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// GET all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});


// GET book by ID
router.get('/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) res.json(book);
    else res.status(404).send('Book not found');
});

// POST new book
router.post('/', authMiddleware, async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const newBook = await Book.create({ title, author, year });
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE book
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        await book.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
module.exports = router;
