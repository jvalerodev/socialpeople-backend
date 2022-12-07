import { Types } from 'mongoose';

/** AUTH CONTROLLER */
interface User {
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
}

export interface RegisterBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picturePath: string;
  friends: [];
  location: string;
  occupation: string;
}

export interface RegisterSuccess extends User {
  ok: boolean;
}

export interface RegisterError {
  msg: string;
  ok: boolean;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginSuccess extends User {
  token: string;
  ok: boolean;
}

export interface LoginError {
  msg: string;
  ok: boolean;
}
