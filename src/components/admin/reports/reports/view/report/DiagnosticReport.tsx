import React from 'react';
import PatientInfo from './patientInfo';
import Footer from './footer';
import Header from './header';
import LabReportTable from './table';

const DiagnosticReport = ({ report, isTest }) => {
  return (
    <div className="container m-4 mx-auto border bg-white p-4 shadow-lg">
      {/* Header Section */}
      <div className="border-b pb-4">
        <Header />
      </div>

      {/* Gradient Divider */}
      <div className="relative my-4 h-2">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-green-600"></div>
      </div>

      {/* Patient Information */}
      <div className="p-4">
        <PatientInfo record={report} />
      </div>

      {/* Report Title */}
      <div className="border-y border-gray-300 p-4 text-center">
        <h2 className="text-2xl font-bold">
          {report?.reportData?.reportName || report?.testName || 'Report Name'}
        </h2>
      </div>

      {/* Lab Report Table */}
      <div className="p-4">
        <LabReportTable report={report} isTest={isTest} />
      </div>

      {/* Footer Section */}
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default DiagnosticReport;
