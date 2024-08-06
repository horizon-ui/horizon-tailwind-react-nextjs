import userSetting, { UserSettingDocument } from '../models/userSetting';

// Find all users from the user schema
export const getAllUserSetting = async (): Promise<UserSettingDocument[]> => {
  return await userSetting.find().limit(100).exec();
};

// update setting
export const updateUserSettingService = async (
  id: string,
  userSettings: Partial<UserSettingDocument>,
): Promise<UserSettingDocument | null> => {
  try {
    if (!id || id === null) {
      return null;
    }

    let updatedUserSetting: UserSettingDocument | null;

    let resp = await userSetting.find().exec();

    if (resp.length === 0) {
      updatedUserSetting = await userSetting.create(userSettings);
    } else {
      // Try to find and update existing document by id
      updatedUserSetting = await userSetting.findByIdAndUpdate(
        id,
        { $set: userSettings },
        { new: true },
      );
    }
    return updatedUserSetting;
  } catch (error) {
    console.error('Error updating user settings:', error);
    return null;
  }
};
