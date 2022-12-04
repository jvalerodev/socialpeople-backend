import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions);

    const url = `${db.connection.host}:${db.connection.port}`;

    console.log(`MongoDB connected in: ${url}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
