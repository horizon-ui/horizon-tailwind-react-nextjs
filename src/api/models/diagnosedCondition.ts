import mongoose, { Schema } from 'mongoose';

export interface DiagnosedConditionDocument {
  name: string;
  alias: string[];
  status: boolean;
}

const DiagnosedConditionSchema: Schema<DiagnosedConditionDocument> =
  new Schema<DiagnosedConditionDocument>({
    name: {
      type: String,
      unique: true,
      required: [true, 'Diagnosed condition name required'],
    },
    alias: {
      type: [String],
      unique: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  });

DiagnosedConditionSchema.pre('findOneAndUpdate', function (next) {
  this.setOptions({ runValidators: true });
  next();
});

export default mongoose.models.diagnosedCondition ||
  mongoose.model<DiagnosedConditionDocument>(
    'diagnosedCondition',
    DiagnosedConditionSchema,
  );
