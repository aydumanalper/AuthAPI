import { IUser } from "../models/User";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '15m';
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d';


export const generateAccessToken = (user: IUser) => {
    return jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY ,
    });
  };
  
  export const generateRefreshToken = (user: IUser): string => {
    return jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
  };

  export const verifyRefreshToken = (token: string): string | null => {
    try {
      const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as { id: string };
      return decoded.id;
    } catch (error) {
      return null;
    }
  };