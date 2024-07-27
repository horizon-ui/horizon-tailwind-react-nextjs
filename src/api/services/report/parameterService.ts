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
