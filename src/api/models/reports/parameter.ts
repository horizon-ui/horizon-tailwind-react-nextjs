import mongoose, { Schema } from 'mongoose';

export interface ParamDocument {
  parameter: string;
  description: string;
  remedy: string;
  unit: string;
  alias: string[];
  bioRef: Object;
  isActive: boolean;
}

const femaleRangeDetailsSchema = new mongoose.Schema(
  {
    prePuberty: { type: Boolean, default: false },
    menopause: { type: Boolean, default: false },
    pregnant: {
      type: Boolean,
      default: false,
      trimester: {
        type: String,
        enum: ['first', 'second', 'third', 'none'],
        default: 'none',
      },
    },
  },
  { _id: false },
);

const ParamSchema: Schema<ParamDocument> = new Schema<ParamDocument>({
  parameter: {
    type: String,
    unique: true,
    required: [true, 'Parameter required'],
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  remedy: {
    type: String,
  },
  unit: {
    type: String,
  },
  alias: {
    type: [String],
  },
  bioRef: {
    basicRange: {
      min: Number,
      max: Number,
      unit: String,
    },
    advanceRange: {
      ageRange: [
        {
          ageRangeType: {
            type: String,
            enum: ['pediatric', 'senior', 'adult'],
            message:
              '{VALUE} is not a valid ageRangeType. pediatric senior adult',
            required: [true, 'Age range type is required'],
          },
          unit: String,
          min: Number,
          max: Number,
        },
      ],
      genderRange: [
        {
          genderRangeType: {
            type: String,
            enum: ['male', 'female', 'other'],
            message: '{VALUE} is not a valid genderType. male female other',
            required: [true, 'Gender range type is required'],
          },
          unit: String,
          min: Number,
          max: Number,
          details: femaleRangeDetailsSchema,
        },
      ],
    },
  },
});

ParamSchema.pre('findOneAndUpdate', function (next) {
  this.setOptions({ runValidators: true });
  next();
});

export default mongoose.models.parameter ||
  mongoose.model<ParamDocument>('parameter', ParamSchema);
