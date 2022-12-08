import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  RegisterBody,
  RegisterSuccess,
  LoginBody,
  LoginSuccess,
  Error
} from '../types/typings.js';

/** REGISTER USER */
export const register = async (
  req: Request,
  res: Response<RegisterSuccess | Error>
) => {
  const {
    firstname,
    lastname,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation
  }: RegisterBody = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ msg: 'Email is not available.', ok: false });
    }

    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
    });

    await newUser.save();
    const { password: pass, ...resUser } = newUser.toJSON();

    res.status(201).json({ user: resUser, ok: true });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(500).json({ msg: error.message, ok: false });
    }
  }
};

/** LOGGIN USER */
export const login = async (
  req: Request,
  res: Response<LoginSuccess | Error>
) => {
  const { email, password }: LoginBody = req.body;

  try {
    const user = await User.findOne({ email }).select('-__v');

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist.', ok: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.', ok: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

    const { password: pass, ...resUser } = user.toJSON();

    res.status(200).json({ user: resUser, token, ok: true });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(500).json({ msg: error.message, ok: false });
    }
  }
};
