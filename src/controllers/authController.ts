
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import dotenv from 'dotenv';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/tokenUtils';

dotenv.config();


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
      return; 
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
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};



export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid email or password' });
      return;
    }

   
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    // Generate token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

      // Save refresh token in the database
      user.refreshToken = refreshToken;
      await user.save();

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const reauth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: 'Refresh Token is required',
      });
      return;
    }

    // Verify Refresh Token
    const userId = verifyRefreshToken(refreshToken);
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Invalid Refresh Token',
      });
      return;
    }

    // Find user and validate refresh token
    const user = await User.findById(userId);
    if (!user || user.refreshToken !== refreshToken) {
      res.status(401).json({
        success: false,
        message: 'Invalid Refresh Token',
      });
      return;
    }

    // Generate new Access Token
    const newAccessToken = generateAccessToken(user);

    // Generate a new Refresh Token
    const newRefreshToken = generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken, 
      },
    });
  } catch (error) {
    next(error);
  }
};