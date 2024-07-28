import diagnosedCondition, {
  DiagnosedConditionDocument,
} from '@src/api/models/diagnosedCondition';

export const createDiagnosedConditionService = async (
  diagnosedConditionObj: DiagnosedConditionDocument,
): Promise<DiagnosedConditionDocument> => {
  return await diagnosedCondition.create(diagnosedConditionObj);
};

export const readDiagnosedConditionService = async (): Promise<
  DiagnosedConditionDocument[]
> => {
  return await diagnosedCondition.find().exec();
};

export const updateDiagnosedConditionService = async (
  id: string | string[],
  diagnosedConditionObj: DiagnosedConditionDocument,
): Promise<DiagnosedConditionDocument> => {
  return await diagnosedCondition
    .findByIdAndUpdate(id, diagnosedConditionObj, { new: true })
    .exec();
};

export const deleteDiagnosedConditionService = async (
  id: string | string[],
): Promise<DiagnosedConditionDocument> => {
  return await diagnosedCondition.findByIdAndDelete(id);
};

export const getDcCountService = async (): Promise<number> => {
  try {
    const count = await diagnosedCondition.countDocuments();
    return count;
  } catch (error) {
    console.error('Error fetching dc count:', error);
    throw new Error('Failed to fetch dc count');
  }
};
