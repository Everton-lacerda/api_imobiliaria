const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: 'Token de autenticação inválido', error: error.message });
      }

      req.user = await User.findById(decoded.userId);
      next();
    });
  } catch (error) {
    console.error('Erro ao buscar propriedades:', error);
    res.status(401).json({ message: 'Token de autenticação inválido', error });
  }
};

module.exports = authMiddleware;
