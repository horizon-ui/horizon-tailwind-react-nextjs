import mongoose, { Schema } from 'mongoose';

export interface DurationDocument {
  duration: number;
  type: string;
}

const DurationSchema: Schema<DurationDocument> = new Schema<DurationDocument>({
  duration: {
    type: Number,
    required: [true, 'Dose Duration name required'],
  },
  type: {
    type: String,
    required: [true, 'Dose Duration type required'],
  },
});

// Add a compound index to ensure the unique combination of duration and type
DurationSchema.index({ duration: 1, type: 1 }, { unique: true });

export default mongoose.models.doseDuration ||
  mongoose.model<DurationDocument>('doseDuration', DurationSchema);
