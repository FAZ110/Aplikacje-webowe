const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users'); // Import tras użytkowników
const orderRoutes = require('./routes/orders'); // Import tras zamówień
const authMiddleware = require('./middlewares/authMiddleware'); // Import middleware

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/books', bookRoutes); // Ścieżka do książek
app.use('/api/users', userRoutes); // Ścieżka do użytkowników
app.use('/api/orders', orderRoutes); // Ścieżka do zamówień

// Protected route example
app.post('/api/protected', authMiddleware, (req, res) => {
    res.send(`Access granted for user ID: ${req.user.id}`);
});

// Synchronizacja modeli i start serwera
app.listen(3000, async () => {
    console.log('Server running on http://localhost:3000');
    await sequelize.sync(); // Synchronizacja modeli
});
