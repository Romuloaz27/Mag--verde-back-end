import ratingsService from './ratings.service.js';

const createOrUpdateRating = async (req, res) => {
  const { placeId, score } = req.body;
  const { id: userId } = req.user;

  const { type, message } = await ratingsService.createOrUpdateRating({
    userId,
    placeId,
    score
  });

  res.status(type).json({ message });
};

const getRatingsByPlace = async (req, res) => {
  const { placeId } = req.params;
  const { type, message } = await ratingsService.getRatingsByPlace(placeId);
  res.status(type).json({ message });
};

const deleteRating = async (req, res) => {
  const { id } = req.params;
  const { id: userId, role } = req.user;
  const { type, message } = await ratingsService.deleteRating({ id, userId, role });
  res.status(type).json({ message });
};

export default {
  createOrUpdateRating,
  getRatingsByPlace,
  deleteRating
};
