import mongoose, { Schema } from 'mongoose';
import { DurationDocument } from './duration';
import { VaccineDocument } from './vaccine';

export interface DoseDocument {
  name: string;
  doseDuration: DurationDocument;
  vaccine: VaccineDocument;
  doseType: string;
}

const DoseSchema: Schema<DoseDocument> = new Schema<DoseDocument>({
  name: {
    type: String,
    unique: true,
    required: [true, 'Dose name required'],
  },
  doseDuration: {
    type: Schema.Types.ObjectId,
    ref: 'doseDuration',
    required: [true, 'Dose duration required'],
  },
  vaccine: {
    type: Schema.Types.ObjectId,
    ref: 'vaccine',
    required: [true, 'Dose vaccine required'],
  },
  doseType: {
    type: String,
    required: [true, 'Dose type required'],
  },
});

export default mongoose.models.dose ||
  mongoose.model<DoseDocument>('dose', DoseSchema);
