import mongoose, { Schema } from 'mongoose';

// Gender Range Details Schema
const genderRangeDetailsSchema = new Schema(
  {
    menopause: { type: Boolean, default: false },
    pregnant: { type: Boolean, default: false },
    trimester: {
      type: String,
      enum: ['first', 'second', 'third', 'none'],
      default: 'none',
    },
    prePuberty: { type: Boolean, default: false },
  },
  { _id: false },
);

// Bio Reference Sub-Category Schema
const bioRefSubCategorySchema = new Schema({
  categoryType: String,
  min: Number,
  max: Number,
  unit: String,
  value: Number,
});

// Component Schema
const componentSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isDynamic: { type: Boolean, default: false },
  images: [{ type: String }],
});

// Parameters Schema
const parametersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Parameter name is required'],
      trim: true,
    },
    subText: {
      type: String,
      trim: true,
    },
    adminParamId: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    aliases: [String],
    units: String,
    bioRefRange: {
      basicRange: [
        {
          min: Number,
          max: Number,
          unit: String,
        },
      ],
      advanceRange: {
        ageRange: [
          {
            ageRangeType: {
              type: String,
              enum: ['pediatric', 'senior', 'adult', 'senior citizen'],
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
              enum: ['male', 'female', 'other', 'others'],
              required: [true, 'Gender range type is required'],
            },
            unit: String,
            min: Number,
            max: Number,
            details: genderRangeDetailsSchema,
          },
        ],
        customRange: [bioRefSubCategorySchema],
      },
    },
    remedy: [String],
    isActive: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    diagnosedConditions: {
      type: Object,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  },
);

// Test Schema
const ReportSchema = new Schema(
  {
    testName: { type: String, required: true },
    sampleName: { type: String, required: true, default: '' },
    parameters: [parametersSchema],
    isActive: { type: Boolean, default: false },
    components: [componentSchema],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  },
);

ReportSchema.pre('findOneAndUpdate', function (next) {
  this.setOptions({ runValidators: true });
  next();
});

export default mongoose.models.report || mongoose.model('report', ReportSchema);
