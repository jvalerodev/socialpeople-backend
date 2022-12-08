/** USERS CONTROLLER */

import { Types } from 'mongoose';

export interface GetUserSuccess {
  user: {
    _id: Types.ObjectId;
    firstname: string;
    lastname: string;
    email: string;
    picturePath: string;
    friends: string[];
    location: string;
    occupation: string;
    viewedProfile: number;
    impressions: number;
    createdAt: Date;
    updatedAt: Date;
  };
  ok: boolean;
}

interface Friends {
  _id?: Types.ObjectId;
  firtsname?: string;
  lastname?: string;
  occupation?: string;
  location?: string;
  picturePath?: string;
}

export interface GetFriendsSuccess {
  friends: Friends[];
  ok: boolean;
}

export interface Error {
  msg: string;
  ok: boolean;
}
