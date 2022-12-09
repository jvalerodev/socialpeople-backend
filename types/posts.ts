import { Types } from 'mongoose';

type Post = {
  _id: Types.ObjectId;
  userId: string;
  firstname: string;
  lastname: string;
  location?: string;
  description?: string;
  picturePath?: string;
  userPicturePath?: string;
  likes?: Map<string, boolean>;
  comments?: string[];
  createdAt: Date;
  updatedAt: Date;
};

/** POSTS CONTROLLER */
export type PostBody = {
  userId: string;
  description?: string;
  picturePath?: string;
};

export type PostsRes = {
  posts: Post[];
  ok: boolean;
};

export type LikeBody = {
  userId: string;
};

export type PostRes = {
  post: Post | null;
  ok: boolean;
};
