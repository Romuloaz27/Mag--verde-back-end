import { Router } from 'express';
import ratingsController from './ratings.controller.js';
import { validateToken } from '../../middlewares/validateToken.js';

const ratingsRouter = Router();

ratingsRouter.post('/', validateToken, ratingsController.createOrUpdateRating);
ratingsRouter.get('/:placeId', ratingsController.getRatingsByPlace);
ratingsRouter.delete('/:id', validateToken, ratingsController.deleteRating);

export default ratingsRouter;
