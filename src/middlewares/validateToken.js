import { generateToken, verifyToken } from '../utils/jtwFunctions.js';
import { cookieOptions } from '../config/token.js';

export const validateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }

  const userData = {
    id: decoded.id,
    role: decoded.role
  };

  const newToken = generateToken(userData);
  res.cookie('token', newToken, cookieOptions);

  req.user = userData
  next();
};