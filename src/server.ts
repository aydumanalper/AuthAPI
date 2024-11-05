import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';
import logger from './utils/logger';

dotenv.config();

// Connect to Database
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
