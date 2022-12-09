import { Types } from 'mongoose';

export type User = {
  user: {
    _id: Types.ObjectId;
    firstname: string;
    lastname: string;
    email: string;
    picturePath: string;
    friends: string[];
    location?: string;
    occupation?: string;
    viewedProfile?: number;
    impressions?: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

/** USERS CONTROLLER */
export type GetUserRes = User & {
  ok: boolean;
};

type Friends = {
  _id?: Types.ObjectId;
  firtsname?: string;
  lastname?: string;
  occupation?: string;
  location?: string;
  picturePath?: string;
};

export type GetFriendsRes = {
  friends: Friends[];
  ok: boolean;
};
