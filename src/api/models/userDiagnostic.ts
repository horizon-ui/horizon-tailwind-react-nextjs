import { Schema } from 'mongoose';
import mongoose from 'mongoose';

// Define the structure of a Diagnostic document
export interface DiagnosticSettingDocument {
  FAQs: string;
  Privacy_Policy: string;
  Terms_Of_Service: string;
  Platform_Consent: string;
  Disclaimer: string;
  Customer_Support: string;
}
// Define the schema for the Diagnostic collection
const DiagnosticSettingSchema: Schema<DiagnosticSettingDocument> =
  new Schema<DiagnosticSettingDocument>({
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

// Export the Diagnostic model if it exists, otherwise create and export it
export default mongoose.models.DiagnosticSetting ||
  mongoose.model<DiagnosticSettingDocument>(
    'DiagnosticSetting',
    DiagnosticSettingSchema,
  );
