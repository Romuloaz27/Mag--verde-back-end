import availabilityServices from './availability.service.js';

const createAvailability = async (req, res) => {
  const { placeId, date, isOpen, notes } = req.body;
  const { type, message } = await availabilityServices.createAvailability({
    placeId,
    date,
    isOpen,
    notes,
  });

  res.status(type).json({ message });
};

const getAvailabilityByPlace = async (req, res) => {
  const { placeId } = req.params;
  const { type, message } = await availabilityServices.getAvailabilityByPlace(placeId);
  res.status(type).json({ message });
};

const updateAvailability = async (req, res) => {
  const { id } = req.params;
  const { placeId, date, isOpen, notes } = req.body;
  const { type, message } = await availabilityServices.updateAvailability(id, {
    placeId,
    date,
    isOpen,
    notes,
  });

  res.status(type).json({ message });
};

const deleteAvailability = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await availabilityServices.deleteAvailability(id);
  res.status(type).json({ message });
};

export default {
  createAvailability,
  getAvailabilityByPlace,
  updateAvailability,
  deleteAvailability,
};
