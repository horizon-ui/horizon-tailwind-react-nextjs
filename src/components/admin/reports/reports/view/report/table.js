import React from 'react';

const LabReportTable = ({ report, isTest }) => {
  console.log('LabReportTable', report);

  // Function to determine if value is out of range
  const isOutOfRange = (value, min, max) => {
    const numericValue = Number(value);
    return numericValue < min || numericValue > max;
  };

  const renderSubRows = (rangeType, range, isFirstSubRow) => {
    const outOfRangeStyle = isOutOfRange(range?.value, range?.min, range?.max)
      ? 'text-red-500 font-bold'
      : '';

    return (
      <tr
        key={`${rangeType}-${range.min}-${range.max}`}
        className={isFirstSubRow ? '' : 'border-t-0'}
      >
        <td className="p-2 text-md"></td> {/* Empty cell for alignment */}
        <td className={`p-2 text-md ${outOfRangeStyle}`}>
          {range?.value || 'N/A'}
        </td>
        <td className="p-2 text-md">
          {range?.min} - {range?.max}
        </td>
        <td className="p-2 text-md">{range?.unit || 'N/A'}</td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto p-5">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Investigation</th>
            <th className="text-left p-2">Result</th>
            <th className="text-left p-2">Reference Value</th>
            <th className="text-left p-2">Unit</th>
          </tr>
        </thead>
        <tbody>
          {(isTest
            ? report?.parameters
            : report?.reportData?.parsedData?.parameters
          )?.map((param, paramIndex) => (
            <React.Fragment key={paramIndex}>
              {/* Parameter Name Row */}
              <tr className="border-b text-left">
                <td className="p-2 font-semibold text-md">{param?.name}</td>
                <td colSpan="3"></td> {/* Empty cells to align sub-rows */}
              </tr>

              {/* Basic Range */}
              {param?.bioRefRange?.basicRange?.map((range, index) =>
                renderSubRows('Basic Range', range, index === 0),
              )}

              {/* Age Range */}
              {param?.bioRefRange?.advanceRange?.ageRange?.map((range, index) =>
                renderSubRows(
                  `Age Range (${range.ageRangeType})`,
                  range,
                  index === 0,
                ),
              )}

              {/* Gender Range */}
              {param?.bioRefRange?.advanceRange?.genderRange?.map(
                (range, index) =>
                  renderSubRows(
                    `Gender Range (${range.genderRangeType})`,
                    range,
                    index === 0,
                  ),
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Display additional components below the table */}
      {report.reportData?.parsedData.components?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3">Additional Components</h2>
          {report.reportData.parsedData.components.map((component, index) => (
            <div key={index} className="border-t pt-4 mt-4">
              <h3 className="text-lg font-bold">{component.title}</h3>
              <div
                className="ck-content"
                dangerouslySetInnerHTML={{ __html: component.content }}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabReportTable;
