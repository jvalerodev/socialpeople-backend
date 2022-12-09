import { Request, Response } from 'express';
import User from '../models/User.js';
import Post from '../models/Post.js';
import {
  PostBody,
  LikeBody,
  PostsRes,
  PostRes,
  ErrorRes
} from '../types/typings.js';

export const getFeedPosts = async (
  req: Request,
  res: Response<PostsRes | ErrorRes>
) => {
  try {
    const posts = await Post.find().select('-__v');
    res.status(200).json({ posts, ok: true });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(500).json({ msg: error.message, ok: false });
    }
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response<PostsRes | ErrorRes>
) => {
  const { userId } = req.params;

  try {
    const posts = await Post.find({ userId }).select('-__v');
    res.status(200).json({ posts, ok: true });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(500).json({ msg: error.message, ok: false });
    }
  }
};

export const createPost = async (
  req: Request,
  res: Response<PostsRes | ErrorRes>
) => {
  const { userId, description, picturePath }: PostBody = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found.', ok: false });
    }

    const newPost = new Post({
      userId,
      firstname: user.firstname,
      lastname: user.lastname,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    });

    await newPost.save();
    const posts = await Post.find().select('-__v');

    res.status(201).json({ posts, ok: true });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(500).json({ msg: error.message, ok: false });
    }
  }
};

export const likePost = async (
  req: Request,
  res: Response<PostRes | ErrorRes>
) => {
  const { id } = req.params;
  const { userId }: LikeBody = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found.', ok: false });
    }

    const isLiked = post.likes?.get(userId);

    if (isLiked) {
      post.likes?.delete(userId);
    } else {
      post.likes?.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json({ post: updatedPost, ok: true });
  } catch (error) {
    console.log(error);
  }
};
