import express from 'express';
import { upload } from '../config/multer.js';
import { register } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', upload.single('picture'), register);

export default router;
