import { Schema } from 'mongoose';
import mongoose from 'mongoose';

// Define the structure of a user document
export interface UserDocument {
  role: string;
  userName: string;
  phoneNumber: string;
  createdAt?: Date;
  deletedAt?: Date | null; // Optional field for soft deletion
}

// Define the schema for the User collection
const UserSchema: Schema<UserDocument> = new Schema<UserDocument>({
  role: {
    type: String,
    default: 'sme', // Default role
    required: true,
    enum: ['sme', 'admin', 'user', 'legal'], // Enumerate allowed roles
  },
  userName: {
    type: String,
    trim: true,
    required: [true, 'User name is required'], // Validation message if required check fails
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: [true, 'Phone number is required'],
    unique: true, // Ensure uniqueness constraint directly specified
    match: [/^\+\d{10,14}$/, 'Please fill a valid phone number'], // Validate format of phone number
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default value for createdAt
  },
  deletedAt: {
    type: Date,
    default: null, // Default to null for deletedAt (not deleted initially)
  },
});

UserSchema.pre('findOneAndUpdate', function (next) {
  this.setOptions({ runValidators: true });
  next();
});

// Export the User model if it exists, otherwise create and export it
export default mongoose.models.User ||
  mongoose.model<UserDocument>('User', UserSchema);
