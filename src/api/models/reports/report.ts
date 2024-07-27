import mongoose, { Schema } from 'mongoose';
import { SampleDocument } from './sample';
import { ParamDocument } from './parameter';

export interface ReportDocument {
  name: string;
  description: string;
  isActive: boolean;
  parameter: ParamDocument;
  sample: SampleDocument;
}

const ReportSchema: Schema<ReportDocument> = new Schema<ReportDocument>({
  name: {
    type: String,
    required: [true, 'Report name is required'],
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  parameter: {
    type: Schema.Types.ObjectId,
    ref: 'parameter',
    required: [true, 'parameter required'],
  },
  sample: {
    type: Schema.Types.ObjectId,
    ref: 'sample',
    required: [true, 'sample required'],
  },
});

ReportSchema.pre('findOneAndUpdate', function (next) {
  this.setOptions({ runValidators: true });
  next();
});

export default mongoose.models.report ||
  mongoose.model<ReportDocument>('report', ReportSchema);
