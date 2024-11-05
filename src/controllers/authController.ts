// src/controllers/authController.ts

import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, surname, birthday, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ success: false, message: 'Email already in use' });
      return; // Exit the function
    }

    // Create new user
    const user = await User.create({
      name,
      surname,
      birthday,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
