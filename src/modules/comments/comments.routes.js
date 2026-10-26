import { Router } from 'express';
import commentsController from './comments.controller.js';
import { validateToken } from '../../middlewares/validateToken.js';

const commentsRouter = Router();

commentsRouter.post('/', validateToken, commentsController.createComment);
commentsRouter.get('/:placeId', commentsController.getCommentsByPlace);
commentsRouter.delete('/:id', validateToken, commentsController.deleteComment);

export default commentsRouter;
