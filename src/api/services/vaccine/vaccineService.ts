import vaccine, { VaccineDocument } from '@src/api/models/vaccine/vaccine';

export const createVaccineService = async (
  vacccineObj: VaccineDocument,
): Promise<VaccineDocument> => {
  return await vaccine.create(vacccineObj);
};

export const readVaccineService = async (): Promise<VaccineDocument[]> => {
  return await vaccine.find().exec();
};

export const updateVaccineService = async (
  id: string | string[],
  vacccineObj: VaccineDocument,
): Promise<VaccineDocument> => {
  return await vaccine.findByIdAndUpdate(id, vacccineObj, { new: true }).exec();
};

export const deleteVaccineService = async (
  id: string | string[],
): Promise<VaccineDocument> => {
  return await vaccine.findByIdAndDelete(id);
};

export const getVaccineService = async (): Promise<number> => {
  try {
    const count = await vaccine.countDocuments();
    return count;
  } catch (error) {
    console.error('Error fetching vaccine count:', error);
    throw new Error('Failed to fetch vaccine count');
  }
};
