import { cookieOptions } from '../../config/token.js';
import authService from './auth.service.js';

const signUp = async (req, res) => {
  const { type, message, token } = await authService.signUp(req.body);
   if (token) {
    res.cookie('token', token, cookieOptions);
  }
  res.status(type).json({ message })
}

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const { type, message, token } = await authService.signIn({ email, password });
   if (token) {
    res.cookie('token', token, cookieOptions);
  }
  res.status(type).json({ message })
}

export default {
  signUp,
  signIn,
};
