import { prisma } from '../../database/prisma.js';

const createOrUpdateRating = async ({ userId, placeId, score }) => {
  const rating = await prisma.rating.upsert({
    where: {
      userId_placeId: { userId, placeId }
    },
    update: { score },
    create: {
      userId,
      placeId,
      score
    }
  });
  return { type: 201, message: rating };
};

const getRatingsByPlace = async (placeId) => {
  const ratings = await prisma.rating.findMany({
    where: { placeId },
    include: {
      user: { select: { name: true } }
    }
  });
  return { type: 200, message: ratings };
};

const deleteRating = async ({ id, userId, role }) => {
  const rating = await prisma.rating.findUnique({ where: { id } });
  if (!rating) return { type: 404, message: 'Avaliação não encontrada.' };
  if (rating.userId !== userId && role !== 'admin') {
    return { type: 403, message: 'Sem permissão para excluir.' };
  }
  await prisma.rating.delete({ where: { id } });
  return { type: 204, message: null };
};

export default {
  createOrUpdateRating,
  getRatingsByPlace,
  deleteRating
};
