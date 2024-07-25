import LandingSetting, { LandingSettingDocument } from '../models/landing'; // Adjust model import for LandingSetting

// Service to get all landing settings
export const getAllLandingSettingService = async (): Promise<
  LandingSettingDocument[]
> => {
  try {
    return await LandingSetting.find().limit(100).exec();
  } catch (error) {
    console.error('Error fetching all landing settings:', error);
    return [];
  }
};

// Service to update landing setting by ID or create new if not found
export const updateLandingSettingService = async (
  id: string | undefined,
  landingSettings: Partial<LandingSettingDocument>,
): Promise<LandingSettingDocument | null> => {
  try {
    let updatedLandingSetting: LandingSettingDocument | null;

    // Find all existing landing settings
    const existingSettings = await LandingSetting.find().exec();

    // If no ID provided or no existing settings found, create new setting
    // Update existing setting by ID
    updatedLandingSetting = await LandingSetting.findByIdAndUpdate(
      id,
      { $set: landingSettings },
      { new: true },
    );

    return updatedLandingSetting;
  } catch (error) {
    console.error('Error updating landing setting:', error);
    return null;
  }
};
