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

// import { Descriptions, Image, Tag } from "antd";
// import React from "react";
// import PatientInfo from "./patientInfo";
// import Footer from "./footer";
// import Header from "./header";
// import TableComp from "./table";
// import LabReportTable from "./table";

// const DiagnosticReport = ({ report }) => {
//   console.log("preview", report)
//   return (
//     <div className="container mx-auto bg-white shadow-lg border m-4 p-2">
//       <div className="border-b pb-4 py-8 px-4 text-left">
//         <Header record={report} />
//       </div>

//       <div className="bg-blue-800 p-2 relative overflow-hidden">
//         <div
//           className="absolute inset-0 bg-gradient-to-r from-orange-600 to-transparent"
//           style={{ transform: "skewX(-20deg)", width: "150%", left: "-25%" }}
//         ></div>
//         <div
//           className="absolute inset-0 bg-gradient-to-r from-transparent to-green-600"
//           style={{ transform: "skewX(-20deg)", width: "150%", left: "-50%" }}
//         ></div>
//         <div
//           className="absolute inset-0 bg-gradient-to-r from-orange-600 to-transparent"
//           style={{ transform: "skewX(-20deg)", width: "150%", left: "-75%" }}
//         ></div>
//       </div>

//       <div className=" grid grid-cols-">
//         <PatientInfo record={report} />
//       </div>

//       <div className=" border-y p-4 border-gray-700 text-center">
//         <h2 className="font-bold text-2xl">
//           {report?.reportData?.reportName || "Report Name"}
//         </h2>
//       </div>

//       <div className="text-center px-10">
//         <LabReportTable report={report} />
//       </div>

//       <div className="mb-4">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default DiagnosticReport;
