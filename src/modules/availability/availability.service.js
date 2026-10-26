import { prisma } from '../../database/prisma.js';

const createAvailability = async (data) => {
  const item = await prisma.availability.create({ data });
  return { type: 201, message: item };
};

const getAvailabilityByPlace = async (placeId) => {
  const list = await prisma.availability.findMany({
    where: { placeId },
    orderBy: { date: 'asc' },
  });

  if (!list.length) return { type: 404, message: 'Nenhuma disponibilidade encontrada!' };

  return { type: 200, message: list };
};

const updateAvailability = async (id, data) => {
  const item = await prisma.availability.update({ where: { id }, data });
  return { type: 200, message: item };
};

const deleteAvailability = async (id) => {
  try {
    const item = await prisma.availability.delete({ where: { id } });
    return { type: 204, message: item };
  } catch (error) {
    if (error.code === 'P2025') {
      return { type: 404, message: 'Já deletado ou não encontrado!' };
    }

    throw error;
  }
};

export default {
  createAvailability,
  getAvailabilityByPlace,
  updateAvailability,
  deleteAvailability,
};
