import parameter from '@src/api/models/reports/parameter';
import param, { ParamDocument } from '@src/api/models/reports/parameter';

export const createParamService = async (
  paramObj: ParamDocument,
): Promise<ParamDocument> => {
  return await param.create(paramObj);
};

export const readParamService = async (): Promise<ParamDocument[]> => {
  return await param.find();
};

export const updateParamService = async (
  id: string | string[],
  paramObj: any,
): Promise<ParamDocument[]> => {
  return await param.findByIdAndUpdate(id, paramObj, { new: true });
};

export const deleteParamService = async (
  id: string | string[],
): Promise<ParamDocument> => {
  return await param.findByIdAndDelete(id);
};

export const getParameterCountService = async (): Promise<number> => {
  try {
    const count = await parameter.countDocuments();
    return count;
  } catch (error) {
    console.error('Error fetching paramter count:', error);
    throw new Error('Failed to fetch paramter count');
  }
};
