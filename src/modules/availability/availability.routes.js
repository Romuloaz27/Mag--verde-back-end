import { Router } from 'express';
import availabilityController from './availability.controller.js';
import { validateToken } from '../../middlewares/validateToken.js';
import { isAdmin } from '../../middlewares/isAdmin.js';

const availabilityRouter = Router();

availabilityRouter.post('/', validateToken, isAdmin, availabilityController.createAvailability);
availabilityRouter.get('/:placeId', validateToken, isAdmin, availabilityController.getAvailabilityByPlace);
availabilityRouter.put('/:id', validateToken, isAdmin, availabilityController.updateAvailability);
availabilityRouter.delete('/:id', validateToken, isAdmin, availabilityController.deleteAvailability);

export default availabilityRouter;
