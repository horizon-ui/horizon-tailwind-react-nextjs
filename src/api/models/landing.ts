import { Schema } from 'mongoose';
import mongoose from 'mongoose';

// Define the structure of a user document
export interface LandingSettingDocument {
  customerLogo: { title: string; url: string; alt: string };
  adBanners: { title: string; url: string; alt: string };
  testimonials: { name: string; comment: string; rating: number };
  customerSupport: string;
  additional?: { getStartedUrl: string; demoVideoUrl: number };
}

// Define the schema for the User collection
const LandingSchema: Schema<LandingSettingDocument> =
  new Schema<LandingSettingDocument>({
    customerLogo: {
      type: Object,
      default: null, // Default value set to null
    },
    adBanners: {
      type: Object,
      default: null,
    },
    testimonials: {
      type: Object,
      default: null,
    },
    customerSupport: {
      type: String,
      default: null,
    },
    additional: {
      type: Object,
      default: null,
    },
  });

// Export the User model if it exists, otherwise create and export it
export default mongoose.models.LandingData ||
  mongoose.model<LandingSettingDocument>('landingData', LandingSchema);
