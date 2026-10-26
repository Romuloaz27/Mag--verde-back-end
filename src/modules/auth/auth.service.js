import { prisma } from '../../database/prisma.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jtwFunctions.js';

const signUp = async (data) => {
  try {
    const hashSalt = await bcrypt.genSalt();
    const hashedPassowrd = await bcrypt.hash(data.password, hashSalt)
    const userData = await prisma.user.create({ data: { ...data, password: hashedPassowrd } });
    const { password: _, ...user } = userData;
    const token = generateToken({ id: user.id, role: data.role });
    return { type: 200, message: user, token };
  } catch (error) {
    if (error.code === 'P2002') {
      return { type: 409, message: 'Este email já está cadastrado' };
    }
    throw error;
  }
}

const signIn = async ({ email, password }) => {
  const userData = await prisma.user.findUnique({ where: { email } });

  if (!userData) return { type: 404, message: 'Usuário não encontrado' };

  const isPasswordValid = await bcrypt.compare(password, userData.password);
  if (!isPasswordValid) return { type: 401, message: 'Senha inválida' };

  const { password: _, ...user } = userData;
  const token = generateToken({ id: user.id, role: userData.role });
  return { type: 200, message: user, token };
}

export default {
  signUp,
  signIn,
};
