import express from 'express';
import { upload } from '../config/multer.js';
import { verifyToken } from '../middleware/auth.js';
import {
  getFeedPosts,
  getUserPosts,
  createPost,
  likePost
} from '../controllers/posts.js';

const router = express.Router();

router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

router.post('/post', verifyToken, upload.single('picture'), createPost);

router.patch('/:id/like', verifyToken, likePost);

export default router;
