// src/middlewares/validateRequest.ts

import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateRequest =
  (schema: Joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        const errors = err.details.map((detail) => detail.message);
        res.status(400).json({ success: false, errors }); // Removed 'return'
        return; // Optionally, you can add a return to exit the function
      }
      next(err);
    }
  };

export default validateRequest;
