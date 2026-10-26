import { prisma } from '../../database/prisma.js';

const createComment = async ({ userId, placeId, content }) => {
  const comment = await prisma.comment.create({
    data: { content, userId, placeId }
  });
  return { type: 201, message: comment };
};

const getCommentsByPlace = async (placeId) => {
  const comments = await prisma.comment.findMany({
    where: { placeId },
    include: { user: { select: { name: true } } }
  });
  return { type: 200, message: comments };
};

const deleteComment = async ({ id, userId, role }) => {
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) return { type: 404, message: 'Comentário não encontrado.' };
  if (comment.userId !== userId && role !== 'admin') {
    return { type: 403, message: 'Sem permissão.' };
  }
  await prisma.comment.delete({ where: { id } });
  return { type: 204, message: null };
};

export default {
  createComment,
  getCommentsByPlace,
  deleteComment
};
