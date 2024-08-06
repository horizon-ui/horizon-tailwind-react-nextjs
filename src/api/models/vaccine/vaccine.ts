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

VaccineSchema.pre('findOneAndUpdate', function (next) {
  this.setOptions({ runValidators: true });
  next();
});

export default mongoose.models.vaccine ||
  mongoose.model<VaccineDocument>('vaccine', VaccineSchema);
