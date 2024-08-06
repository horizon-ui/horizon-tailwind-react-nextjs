import sample, { SampleDocument } from '@src/api/models/reports/sample';

export const createSampleService = async (
  sampleObj: SampleDocument,
): Promise<SampleDocument> => {
  return await sample.create(sampleObj);
};

export const readSampleService = async (): Promise<SampleDocument[]> => {
  return await sample.find();
};

export const updateSampleService = async (
  id: string | string[],
  sampleObj: any,
): Promise<SampleDocument[]> => {
  return await sample.findByIdAndUpdate(id, sampleObj, { new: true });
};

export const deleteSampleService = async (
  id: string | string[],
): Promise<SampleDocument> => {
  return await sample.findByIdAndDelete(id);
};

export const getSampleCountService = async (): Promise<number> => {
  try {
    const count = await sample.countDocuments();
    return count;
  } catch (error) {
    console.error('Error fetching sample count:', error);
    throw new Error('Failed to fetch sample count');
  }
};
