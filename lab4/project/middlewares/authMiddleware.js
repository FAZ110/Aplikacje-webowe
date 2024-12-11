const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).send('Access denied');

  // Załóżmy, że token jest w formacie: "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(403).send('Access denied');

  const token = parts[1];

  try {
    // Upewnij się, że 'secretKey' jest identyczny z tym użytym przy generowaniu tokena
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded; // Dodanie danych użytkownika do req
    next();
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};

module.exports = authMiddleware;

