import { Request, Response } from 'express';
import User from '../models/User.js';
import { RegisterBody, RegisterRes } from '../types/typings.js';

export const register = async (req: Request, res: Response<RegisterRes>) => {
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

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ msg: 'Email is not available.', ok: false });
  }

  try {
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
    const savedUser = await User.findOne({ email }).select('-__v -password');

    res.status(201).json({ user: savedUser, ok: true });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message, ok: false });
    }

    console.log(error);
  }
};
