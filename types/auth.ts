import { User } from './users.js';

/** AUTH CONTROLLER */
export type RegisterBody = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picturePath: string;
  friends: [];
  location?: string;
  occupation?: string;
};

export type RegisterRes = User & {
  ok: boolean;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginRes = User & {
  token: string;
  ok: boolean;
};
