import dose, { DoseDocument } from '@src/api/models/vaccine/dose';

export const createDoseService = async (
  doseObj: DoseDocument,
): Promise<DoseDocument> => {
  return await dose.create(doseObj);
};

export const readDoseService = async (): Promise<DoseDocument[]> => {
  return await dose.find().populate('vaccine').populate('doseDuration');
};

export const updatedDoseService = async (
  id: string | string[],
  doseObj: DoseDocument,
): Promise<DoseDocument> => {
  return await dose.findByIdAndUpdate(id, doseObj, { new: true }).exec();
};

export const deletedDoseService = async (
  id: string | string[],
): Promise<DoseDocument> => {
  return await dose.findByIdAndDelete(id);
};

export const getDoseCountService = async (): Promise<number> => {
  try {
    const count = await dose.countDocuments();
    return count;
  } catch (error) {
    console.error('Error fetching dose count:', error);
    throw new Error('Failed to fetch dose count');
  }
};
