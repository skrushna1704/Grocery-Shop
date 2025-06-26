import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/database.js';
import app from './app.js';

const PORT = process.env.PORT || 9000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}); 