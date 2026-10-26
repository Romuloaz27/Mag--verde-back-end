import { Router } from 'express';
import authController from './auth.controller.js';
import { validateSchema } from '../../middlewares/validateSchema.js';
import { authSchema } from '../../schemas/auth.js';

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(authSchema), authController.signUp);
authRouter.post('/sign-in', authController.signIn);

export default authRouter;
