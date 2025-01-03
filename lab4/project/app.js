const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users'); 
const orderRoutes = require('./routes/orders'); 
const authMiddleware = require('./middlewares/authMiddleware'); 

const app = express();
app.use(bodyParser.json());


app.use('/api/books', bookRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/orders', orderRoutes); 


app.post('/api/protected', authMiddleware, (req, res) => {
    res.send(`Access granted for user ID: ${req.user.id}`);
});


app.listen(3000, async () => {
    console.log('Server running on http://localhost:3000');
    await sequelize.sync(); 
});
