import User, { UserDocument } from "../models/User";

// Find all users from the user schema
export const getAllUsers = async (): Promise<UserDocument[]> => {
    return await User.find().exec();
};

// Find user by phone number
export const getUserByPhone = async (phoneNumber: string): Promise<UserDocument | null> => {
    return await User.findOne({ phoneNumber, $or: [
        { deletedAt: null },
        { deletedAt: { $exists: false } }
    ] }).exec();
};

// Create user
export const createUserService = async (user: any): Promise<UserDocument | null> => {
    return await User.create(user);
}

// Delete User by phone
export const deleteUserService = async (phoneNumber: string): Promise<UserDocument | null> => {
    return await User.findOneAndDelete({ phoneNumber }).exec();
};

// Delete User by phone
export const softDeleteUserService = async (phoneNumber: string): Promise<UserDocument | null> => {
    // Find the user document to "soft" delete
    const user = await User.findOne({ phoneNumber }).exec();
    
    if (user) {
        // Mark the document as deleted by setting the deletedAt field
        user.deletedAt = new Date();
        await user.save(); // Save the changes
        
        // Optionally, you can return the user document here
        return user;
    }
    
    return null; // Return null if user with the given phoneNumber is not found
};

// Revert deleted User by phone
export const revertDeleteUserService = async (phoneNumber: string): Promise<UserDocument | null> => {
    // Find the user document to "soft" delete
    const user = await User.findOne({ phoneNumber }).exec();
    
    if (user) {
        // Mark the document as deleted by setting the deletedAt field
        user.deletedAt = null;
        await user.save(); // Save the changes
        
        // Optionally, you can return the user document here
        return user;
    }
    
    return null; // Return null if user with the given phoneNumber is not found
};