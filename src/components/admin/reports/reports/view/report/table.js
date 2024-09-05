import React from 'react';

const LabReportTable = ({ report, isTest }) => {
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
        <td className="text-md p-2"></td> {/* Empty cell for alignment */}
        <td className={`text-md p-2 ${outOfRangeStyle}`}>
          {range?.value || 'N/A'}
        </td>
        <td className="text-md p-2">
          {range?.min} - {range?.max}
        </td>
        <td className="text-md p-2">{range?.unit || 'N/A'}</td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto p-5">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Investigation</th>
            <th className="p-2 text-left">Result</th>
            <th className="p-2 text-left">Reference Value</th>
            <th className="p-2 text-left">Unit</th>
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
                <td className="text-md p-2 font-semibold">{param?.name}</td>
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
          <h2 className="mb-3 text-xl font-bold">Additional Components</h2>
          {report.reportData.parsedData.components.map((component, index) => (
            <div key={index} className="mt-4 border-t pt-4">
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
