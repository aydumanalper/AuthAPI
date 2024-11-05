// src/routes/authRoutes.ts

import express from 'express';
import { register } from '../controllers/authController';
import validateRequest from '../middlewares/validateRequest';
import { registerSchema } from '../validations/authValidation';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validateRequest(registerSchema), register);

export default router;
