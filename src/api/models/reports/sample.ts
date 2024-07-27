import mongoose, { Schema } from 'mongoose';

export interface SampleDocument {
  name: string;
  description: string;
  isActive: boolean;
  validity: {
    value: number;
    unit: string;
  };
}

const SampleSchema: Schema<SampleDocument> = new Schema<SampleDocument>({
  name: {
    type: String,
    unique: true,
    required: [true, 'Sample name required'],
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  validity: {
    value: { type: Number },
    unit: {
      type: String,
      enum: ['day', 'week', 'month', 'year'],
      message:
        '{VALUE} is not a valid unit. Valid options are day, week, month, or year.',
    },
  },
});

SampleSchema.pre('findOneAndUpdate', function (next) {
  this.setOptions({ runValidators: true });
  next();
});

export default mongoose.models.sample ||
  mongoose.model<SampleDocument>('sample', SampleSchema);
