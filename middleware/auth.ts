import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import User from '../models/User.js';

interface AuthRequest extends Request {
  user?: Types.ObjectId;
}

interface AuthError {
  msg: string;
  ok: boolean;
}

type JWTRes = {
  id: string;
  iat: number;
};

export const verifyToken = async (
  req: AuthRequest,
  res: Response<AuthError>,
  next: NextFunction
) => {
  let token: string = '';

  const authorization = req.headers.authorization;
  const startsWithBearer = authorization?.startsWith('Bearer');

  if (authorization && startsWithBearer) {
    try {
      token = authorization.split(' ')[1];

      const verified = jwt.verify(token, process.env.JWT_SECRET!) as JWTRes;
      const user = await User.findOne({ _id: verified.id }).select('-password');
      req.user = user?._id;

      return next();
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(500).json({ msg: error.message, ok: false });
      }
    }
  }

  if (!token) {
    const error = new Error('Invalid or non-existent token.');
    res.status(403).json({ msg: error.message, ok: false });
  }

  next();
};
