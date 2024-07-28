import User, { UserDocument } from '../models/User';
import { internalServerError, validationError } from '../utils/error';

// Find all users from the user schema
export const getAllUsers = async (): Promise<UserDocument[]> => {
  return await User.find().exec();
};

// Find user by phone number
export const getUserByPhone = async (
  phoneNumber: string,
): Promise<UserDocument | null> => {
  return await User.findOne({
    phoneNumber,
    $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
  }).exec();
};

// Create user
export const createUserService = async (
  user: any,
): Promise<UserDocument | null> => {
  return await User.create(user);
};

// Delete User by phone
export const deleteUserService = async (
  phoneNumber: string,
): Promise<UserDocument | null> => {
  return await User.findOneAndDelete({ phoneNumber }).exec();
};

// Update User by phone
export const updateUserService = async (
  phoneNumber: string,
  updatedData: Partial<UserDocument>,
): Promise<UserDocument | null> => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { phoneNumber: phoneNumber }, // Filter condition
      updatedData, // Updated data object
      { new: true }, // To return the updated document
    ).exec();

    return updatedUser;
  } catch (error) {
    throw internalServerError('Server Error');
  }
};

export const getAdminCountService = async (): Promise<number> => {
  try {
    const count = await User.countDocuments();
    return count;
  } catch (error) {
    console.error('Error fetching admin user count:', error);
    throw new Error('Failed to fetch admin user count');
  }
};
