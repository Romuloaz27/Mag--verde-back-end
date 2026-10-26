import commentsService from './comments.service.js';

const createComment = async (req, res) => {
  const { content, placeId } = req.body;
  const { id: userId } = req.user;

  const { type, message } = await commentsService.createComment({
    userId,
    placeId,
    content
  });

  res.status(type).json({ message });
};

const getCommentsByPlace = async (req, res) => {
  const { placeId } = req.params;
  const { type, message } = await commentsService.getCommentsByPlace(placeId);
  res.status(type).json({ message });
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const { id: userId, role } = req.user;
  const { type, message } = await commentsService.deleteComment({ id, userId, role });
  res.status(type).json({ message });
};

export default {
  createComment,
  getCommentsByPlace,
  deleteComment
};
