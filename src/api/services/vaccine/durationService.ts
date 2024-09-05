import duration from '@src/api/models/vaccine/duration';
import doseDuration, {
  DurationDocument,
} from '@src/api/models/vaccine/duration';

export const createdoseDurationService = async (
  duationObj: DurationDocument,
): Promise<DurationDocument> => {
  return await doseDuration.create(duationObj);
};

export const readdoseDurationService = async (): Promise<
  DurationDocument[]
> => {
  return await doseDuration.find().exec();
};

export const updatedoseDurationService = async (
  id: string | string[],
  duationObj: DurationDocument,
): Promise<DurationDocument> => {
  return await doseDuration
    .findByIdAndUpdate(id, duationObj, { new: true })
    .exec();
};

export const deletedoseDurationService = async (
  id: string | string[],
): Promise<DurationDocument> => {
  return await doseDuration.findByIdAndDelete(id);
};

export const getDurationCountService = async (): Promise<number> => {
  try {
    const count = await duration.countDocuments();
    return count;
  } catch (error) {
    console.error('Error fetching duration count:', error);
    throw new Error('Failed to fetch duration count');
  }
};
