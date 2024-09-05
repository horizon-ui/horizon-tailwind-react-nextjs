import DiagnosticSetting, {
  DiagnosticSettingDocument,
} from '../models/diagnosticSetting';

// Find all Diagnostics from the Diagnostic schema
export const getAllDiagnosticSettingService = async (): Promise<
  DiagnosticSettingDocument[]
> => {
  return await DiagnosticSetting.find().limit(100).exec();
};

// update setting
export const updateDiagnosticSettingService = async (
  id: string,
  DiagnosticSettings: Partial<DiagnosticSettingDocument>,
): Promise<DiagnosticSettingDocument | null> => {
  try {
    let updatedDiagnosticSetting: DiagnosticSettingDocument | null;
    // If no document was found and updated, create a new one

    let resp = await DiagnosticSetting.find().exec();

    if (resp.length === 0) {
      updatedDiagnosticSetting = await DiagnosticSetting.create(
        DiagnosticSettings,
      );
    } else {
      // Try to find and update existing document by id
      updatedDiagnosticSetting = await DiagnosticSetting.findByIdAndUpdate(
        id,
        { $set: DiagnosticSettings },
        { new: true },
      );
    }
    return updatedDiagnosticSetting;
  } catch (error) {
    console.error('Error updating Diagnostic settings:', error);
    return null;
  }
};
