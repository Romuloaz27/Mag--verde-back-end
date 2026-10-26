import placesServices from './places.services.js';

const createPlace = async (req, res) => {
  const { name, description, location } = req.body;
  const { type, message } = await placesServices.createPlace({ name, description, location });
  res.status(type).json({ message });
}

const getPlaces = async (_req, res) => {
  const { type, message } = await placesServices.getPlaces();
  res.status(type).json({ message });
}

const getPlaceById = async (req, res) => {
  const { id } = req.params
  const { type, message } = await placesServices.getPlaceById(id);
  res.status(type).json({ message });
}


const updatePlace = async (req, res) => {
  const { id } = req.params
  const { name, description, location } = req.body;
  const { type, message } = await placesServices.updatePlace(id, { name, description, location })
  res.status(type).json({ message });
}

const deletePlace = async (req, res) => {
  const { id } = req.params
  const { type, message } = await placesServices.deletePlace(id);
  res.status(type).json({ message });
}

export default {
  createPlace,
  getPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
};
