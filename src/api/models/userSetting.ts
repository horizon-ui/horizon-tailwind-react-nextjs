import { Schema } from 'mongoose';
import mongoose from 'mongoose';

// Define the structure of a user document
export interface UserSettingDocument {
  FAQs: string;
  Privacy_Policy: string;
  Terms_Of_Service: string;
  Platform_Consent: string;
  Disclaimer: string;
  Customer_Support: string;
}
// Define the schema for the User collection
const UserSettingSchema: Schema<UserSettingDocument> =
  new Schema<UserSettingDocument>({
    FAQs: {
      type: String,
      default: '',
    },
    Privacy_Policy: {
      type: String,
      default: '',
    },
    Terms_Of_Service: {
      type: String,
      default: '',
    },
    Platform_Consent: {
      type: String,
      default: '',
    },
    Disclaimer: {
      type: String,
      default: '',
    },
    Customer_Support: {
      type: String,
      default: '',
    },
  });

UserSettingSchema.pre('findOneAndUpdate', function (next) {
  this.setOptions({ runValidators: true });
  next();
});

// Export the User model if it exists, otherwise create and export it
export default mongoose.models.UserSetting ||
  mongoose.model<UserSettingDocument>('UserSetting', UserSettingSchema);
