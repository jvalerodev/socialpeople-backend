import mongoose, { Schema, Types } from 'mongoose';

interface IPost {
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
}

const postSchema = new Schema(
  {
    userId: {
      type: String,
      require: true
    },
    firstname: {
      type: String,
      require: true,
      min: 2,
      max: 50
    },
    lastname: {
      type: String,
      require: true,
      min: 2,
      max: 50
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean
    },
    comments: [
      {
        type: String,
        default: []
      }
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>('Posts', postSchema);

export default Post;
