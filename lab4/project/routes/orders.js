const express = require('express');
const Order = require('../models/order');
const Book = require('../models/book');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Pobierz zamówienia użytkownika
router.get('/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.findAll({ where: { userId } });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Dodaj zamówienie
router.post('/', authMiddleware, async (req, res) => {
    const {bookId, quantity} = req.body;
    const userId = req.user.id;

    try {
        const book = await Book.findByPk(bookId);
        if (!book) return res.status(404).send('Book not found');

        const order = await Order.create({ userId, bookId, quantity });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Usuń zamówienie
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Order.destroy({ where: { id } });
        res.sendStatus(result ? 204 : 404);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
