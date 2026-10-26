import { Router } from 'express';
import placesController from './places.controller.js';
import { validateToken } from '../../middlewares/validateToken.js';
import { isAdmin } from '../../middlewares/isAdmin.js';

const placesRouter = Router();

placesRouter.post('/', validateToken, isAdmin, placesController.createPlace);
placesRouter.get('/', placesController.getPlaces);
placesRouter.get('/:id', placesController.getPlaceById);
placesRouter.put('/:id', validateToken, isAdmin, placesController.updatePlace);
placesRouter.delete('/:id', validateToken, isAdmin, placesController.deletePlace);

export default placesRouter;
