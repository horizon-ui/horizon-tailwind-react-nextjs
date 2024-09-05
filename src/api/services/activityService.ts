import Activity, { ActivityDocument } from '../models/Activity';

// Find all users from the user schema
export const getAllActivity = async (): Promise<ActivityDocument[]> => {
  return await Activity.find().limit(100).exec();
};

// Create user
export const createActivityService = async (
  activity: any,
): Promise<ActivityDocument | null> => {
  return await Activity.create(activity);
};
