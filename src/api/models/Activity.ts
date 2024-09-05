import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { UserDocument } from './User';

enum ActionType {
  ADDED = 'added',
  DELETED = 'deleted',
  UPDATED = 'updated',
}

// Define the structure of a user document
export interface ActivityDocument {
  title: string;
  description: string;
  user: Object;
  timeStamp: Date;
  action?: ActionType;
}

// Define the schema for the User collection
const ActivitySchema: Schema<ActivityDocument> = new Schema<ActivityDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description name is required'],
  },
  user: {
    type: Object,
    required: [true, 'User number is required'],
  },
  timeStamp: {
    type: Date,
    default: Date.now, // Default value for createdAt
  },
  action: {
    type: String,
    enum: Object.values(ActionType),
  },
});

ActivitySchema.pre('findOneAndUpdate', function (next) {
  this.setOptions({ runValidators: true });
  next();
});

// Export the User model if it exists, otherwise create and export it
export default mongoose.models.Activity ||
  mongoose.model<ActivityDocument>('Activity', ActivitySchema);
