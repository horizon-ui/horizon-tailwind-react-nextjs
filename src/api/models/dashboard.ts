import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { ActivityDocument } from './Activity';

// Define the structure of a Diagnostic document
export interface DashboardDocument {
  cardData: {
    dcCount: number;
    userCount: number;
    reportCount: number;
    vaccineCount: number;
    diagnosedConditionCount: number;
  };
  activities: [ActivityDocument];
  lineCharts: {
    userCounts: {
      dcUsers: number;
      omeraldUsers: number;
    };
    dcAssetCount: {
      dcReports: number;
      dcTests: number;
    };
  };
  donutChart: {
    users: {
      omeraldUsers: number;
      adminUsers: number;
      diagUsers: number;
    };
    dcDocs: {
      totalDcReport: number;
      totalDcTests: number;
    };
    adminData: {
      vaccineCount: number;
      doseCount: number;
      doseDurationCount: number;
      reportCount: number;
      parameterCount: number;
      sampleCount: number;
      diagnosedConditionCount: number;
    };
  };
}
// Define the schema for the Diagnostic collection
const DashboardSchema: Schema<DashboardDocument> =
  new Schema<DashboardDocument>({
    cardData: {
      dcCount: { type: Number },
      userCount: { type: Number },
      reportCount: { type: Number },
      vaccineCount: { type: Number },
      diagnosedConditionCount: { type: Number },
    },
    activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
    lineCharts: {
      userCounts: {
        dcUsers: { type: Number },
        omeraldUsers: { type: Number },
      },
      dcAssetCount: {
        dcTeports: { type: Number },
        dcTests: { type: Number },
      },
    },
    donutChart: {
      users: {
        omeraldUsers: { type: Number },
        adminUsers: { type: Number },
        diagUsers: { type: Number },
      },
      dcDocs: {
        totalDcReport: { type: Number },
        totalDcTests: { type: Number },
      },
      adminData: {
        vaccineCount: { type: Number },
        doseCount: { type: Number },
        doseDurationCount: { type: Number },
        reportCount: { type: Number },
        parameterCount: { type: Number },
        sampleCount: { type: Number },
        diagnosedConditionCount: { type: Number },
      },
    },
  });

DashboardSchema.pre('findOneAndUpdate', function (next) {
  this.setOptions({ runValidators: true });
  next();
});

// Export the Diagnostic model if it exists, otherwise create and export it
export default mongoose.models.dashboard ||
  mongoose.model<DashboardDocument>('dashboard', DashboardSchema);
