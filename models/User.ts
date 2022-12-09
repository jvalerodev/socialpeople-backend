import mongoose, { Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picturePath: string;
  friends: string[];
  location?: string;
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 2,
      max: 50
    },
    lastname: {
      type: String,
      required: true,
      min: 2,
      max: 50
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 5
    },
    picturePath: {
      type: String,
      default: ''
    },
    friends: [
      {
        type: String,
        default: []
      }
    ],
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUser>('Users', userSchema);

export default User;
