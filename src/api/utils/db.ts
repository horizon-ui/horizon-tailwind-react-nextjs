import mongoose from 'mongoose';

/**
 * Database Utility for connecting to MongoDB
 * Handles connection and disconnection with clean exception handling
 */

const mongoURI = process.env.MONGO_URI || '';
if (!mongoURI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env',
  );
}

/**
 * Connect to MongoDB
 * This function attempts to connect to the MongoDB instance using Mongoose.
 * @returns {Promise<void>}
 */
export const connectDB = async (): Promise<void> => {
  try {
    // Check if we are already connected to the database
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

/**
 * Disconnect from MongoDB
 * This function attempts to disconnect from the MongoDB instance using Mongoose.
 * @returns {Promise<void>}
 */
export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Successfully disconnected from MongoDB.');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw new Error('Failed to disconnect from MongoDB');
  }
};

/**
 * Utility to check MongoDB connection status
 * @returns {boolean} - Returns true if connected, false otherwise
 */
export const isConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};
