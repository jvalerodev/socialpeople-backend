import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picturePath: string;
  friends: string[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
}

const UserSchema = new Schema<IUser>(
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
    friends: {
      type: [],
      default: []
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('Users', UserSchema);

export default User;
