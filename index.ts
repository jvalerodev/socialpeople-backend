import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/mongo.js';
import { authRoutes, userRoutes, postRoutes } from './routes/index.js';

/** CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

const corsOptions = {
  origin: process.env.FRONTEND_URL!.split(' '),
  credentials: true
};

app.use(cors(corsOptions));

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/** ROUTES */
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

/** MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
await connectDB();

/** INIT APP */
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
