/** AUTH CONTROLLER */
export type RegisterBody = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picturePath: string;
  friends: [];
  location: string;
  occupation: string;
};

export type RegisterRes = {
  user?: {
    firstname: string;
    lastname: string;
    email: string;
    picturePath: string;
    friends: string[];
    location: string;
    occupation: string;
    viewedProfile: number;
    impressions: number;
  } | null;
  msg?: string;
  ok: boolean;
};
