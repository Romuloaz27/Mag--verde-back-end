import { prisma } from '../../database/prisma.js';

const createPlace = async (data) => {
  const place = await prisma.place.create({ data });
  return { type: 201, message: place };
};

const getPlaces = async () => {
  const places = await prisma.place.findMany();
  return { type: 200, message: places };
};

const getPlaceById = async (id) => {
  const place = await prisma.place.findFirst({ where: { id } });
  if (!place) return { type: 404, message: 'Atração não encontrada!' };
  return { type: 200, message: place };
};

const updatePlace = async (id, data) => {
  try {
    const place = await prisma.place.update({ where: { id }, data });
    return { type: 200, message: place };
  } catch (error) {
    if (error.code === 'P2025') {
      return { type: 404, message: 'Atração não encontrada!' };
    }
    throw error;
  }
};

const deletePlace = async (id) => {
  try {
    const place = await prisma.place.delete({ where: { id } });
    return { type: 204, message: place };
  } catch (error) {
    if (error.code === 'P2025') {
      return { type: 404, message: 'Já deletado ou não encontrado!' };
    }
    throw error;
  }
};

export default {
  createPlace,
  getPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
};
