import jwt from 'jsonwebtoken';
import { secretKey, tokenConfig } from '../config/token.js';

export const generateToken = ({ id, role }) => {
  const token = jwt.sign({ id, role }, secretKey, tokenConfig);
  return token;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch {
    return null;
  }
};
