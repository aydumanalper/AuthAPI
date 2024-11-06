
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import dotenv from 'dotenv';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/tokenUtils';
import bcrypt from 'bcryptjs';

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

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // The user is attached to the request by the authenticate middleware
    const user = (req as any).user as IUser;

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    // Remove the refresh token from the user
    user.refreshToken = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const removeAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // The user is attached to the request by the authenticate middleware
    const user = (req as any).user as IUser;

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    // Optional: Invalidate the user's Access Token by blacklisting
    // const authHeader = req.headers.authorization;
    // if (authHeader && authHeader.startsWith('Bearer ')) {
    //   const accessToken = authHeader.split(' ')[1];
    //   const decoded = jwt.decode(accessToken) as { exp: number };
    //   if (decoded && decoded.exp) {
    //     const expiresAt = new Date(decoded.exp * 1000);
    //     await TokenBlacklist.create({ token: accessToken, expiresAt });
    //   }
    // }

    // Delete the user from the database
    await User.findByIdAndDelete(user._id);

    res.status(200).json({
      success: true,
      message: 'Account removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // The user is attached to the request by the authenticate middleware
    const user = (req as any).user as IUser;

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    // Exclude sensitive information before sending
    const { password, refreshToken, __v, ...userData } = user.toObject();

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // The user is attached to the request by the authenticate middleware
    const user = (req as any).user as IUser;

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Verify that oldPassword matches the current password
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: 'Incorrect old password',
      });
      return;
    }

    // Optional: Check if the new password is different from the old password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      res.status(400).json({
        success: false,
        message: 'New password must be different from the old password',
      });
      return;
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    // Optional: Invalidate existing Refresh Tokens by removing them
    user.refreshToken = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};


export const editUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // The user is attached to the request by the authenticate middleware
    const user = (req as any).user as IUser;

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { name, surname, birthday } = req.body;

    // Create an object with the fields to update
    const updatedFields: Partial<IUser> = {};
    if (name !== undefined) updatedFields.name = name;
    if (surname !== undefined) updatedFields.surname = surname;
    if (birthday !== undefined) updatedFields.birthday = birthday;

    // Update the user's information
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    ).select('-password -refreshToken -__v'); // Exclude sensitive fields

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};