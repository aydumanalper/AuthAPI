import { Router } from 'express';
import authRoutes from './authRoutes';

const mainRouter = Router();

mainRouter.use('/api/auth', authRoutes);

export default mainRouter;
