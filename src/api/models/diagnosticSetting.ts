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
  Ad_Banner: [
    {
      title: string;
      url: string;
      alt: string;
      updatedAt: Date;
    },
  ];
  Customer_Logo: [
    {
      title: string;
      url: string;
      alt: string;
      updatedAt: Date;
    },
  ];
  Additional: {
    getStartedUrl: string;
    demoVideoUrl: string;
  };
  Testimonials: [
    {
      name: string;
      comment: string;
      rating: number;
      updatedAt: Date;
    },
  ];
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
    Ad_Banner: [
      {
        title: { type: String, default: '' },
        url: { type: String, default: '' },
        alt: { type: String, default: '' },
        updatedAt: { type: Date },
      },
    ],
    Customer_Logo: [
      {
        title: { type: String, default: '' },
        url: { type: String, default: '' },
        alt: { type: String, default: '' },
        updatedAt: { type: Date },
      },
    ],
    Additional: {
      getStartedUrl: { type: String, default: '' },
      demoVideoUrl: { type: String, default: '' },
    },
    Testimonials: [
      {
        name: { type: String, default: '' },
        comment: { type: String, default: '' },
        rating: { type: Number, default: 0 },
        updatedAt: { type: Date },
      },
    ],
  });

// Export the Diagnostic model if it exists, otherwise create and export it
export default mongoose.models.DiagnosticSetting ||
  mongoose.model<DiagnosticSettingDocument>(
    'DiagnosticSetting',
    DiagnosticSettingSchema,
  );
