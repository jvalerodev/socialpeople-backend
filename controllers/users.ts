import { Request, Response } from 'express';
import User from '../models/User.js';
import { GetUserSuccess, GetFriendsSuccess, Error } from '../types/users.js';

export const getUser = async (
  req: Request,
  res: Response<GetUserSuccess | Error>
) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password -__v');

    if (!user) {
      return res.status(404).json({ msg: 'User not found.', ok: false });
    }

    res.status(200).json({ user, ok: true });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(500).json({ msg: error.message, ok: false });
    }
  }
};

export const getUserFriends = async (
  req: Request,
  res: Response<GetFriendsSuccess | Error>
) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password -__v');

    if (!user) {
      return res.status(404).json({ msg: 'User not found.', ok: false });
    }

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map((friend) => ({
      _id: friend?._id,
      firtsname: friend?.firstname,
      lastname: friend?.lastname,
      occupation: friend?.occupation,
      location: friend?.location,
      picturePath: friend?.picturePath
    }));

    res.status(200).json({ friends: formattedFriends, ok: true });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(500).json({ msg: error.message, ok: false });
    }
  }
};

export const addRemoveFriend = async (
  req: Request,
  res: Response<GetFriendsSuccess | Error>
) => {
  const { id, friendId } = req.params;

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ msg: 'Data not found.', ok: false });
    }

    if (user.friends.includes(friendId)) {
      // Remove
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((fId) => fId !== id);
    } else {
      // Add
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map((friend) => ({
      _id: friend?._id,
      firtsname: friend?.firstname,
      lastname: friend?.lastname,
      occupation: friend?.occupation,
      location: friend?.location,
      picturePath: friend?.picturePath
    }));

    res.status(200).json({ friends: formattedFriends, ok: true });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(500).json({ msg: error.message, ok: false });
    }
  }
};
