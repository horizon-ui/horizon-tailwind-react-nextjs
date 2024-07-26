import mongoose, { Schema } from 'mongoose';

export interface VaccineDocument {
  name: string;
}

const VaccineSchema: Schema<VaccineDocument> = new Schema<VaccineDocument>({
  name: {
    type: String,
    unique: true,
    required: [true, 'Vaccine name required'],
  },
});

export default mongoose.models.vaccine ||
  mongoose.model<VaccineDocument>('vaccine', VaccineSchema);
