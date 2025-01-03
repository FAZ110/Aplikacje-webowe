const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).send('Access denied');

  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(403).send('Access denied');

  const token = parts[1];

  try {
    
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};

module.exports = authMiddleware;

