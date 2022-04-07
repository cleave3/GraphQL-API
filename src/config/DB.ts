import mongoose from 'mongoose';
import { config } from "dotenv";
import { secret } from '@foodmoni.com/helper';

config();

const connectionString = process.env.NODE_ENV === 'production' ? secret.GENERAL_PROD_DB.Database.url : secret.GENERAL_DEV_DB.Database.url;
/**
 * Establish connection mongoDB
 */
const DBconnection = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected on ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default DBconnection;
