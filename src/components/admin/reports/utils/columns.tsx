import { DCDataInterface } from '@src/api/utils/interface';
import { Button, Popover, Space, Tag } from 'antd';
import { useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';

// export const REPORTS_COLUMNS = ({ handleEdit, handleDelete }) => {
//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       ellipsis: true,
//       sorter: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       title: 'Sample Type',
//       dataIndex: 'sample',
//       key: 'sample',
//       render: (sample) => {
//         return (
//           <>
//             <Tag>{sample?.name}</Tag>
//           </>
//         );
//       },
//     },
//     {
//       title: 'Diagnosed Conditions',
//       dataIndex: 'diagnosedCondition',
//       key: 'diagnosedConditions',
//       render: (diagnosedCondition) => {
//         return (
//           <>
//             <Tag>{diagnosedCondition?.name}</Tag>
//           </>
//         );
//       },
//     },
//     {
//       title: 'Parameter',
//       dataIndex: 'parameter',
//       key: 'parameter',
//       render: (parameter) => {
//         return <Tag color="green">{parameter?.name}</Tag>;
//       },
//     },
//     {
//       title: 'Report Active',
//       dataIndex: 'isActive',
//       key: 'isActive',
//       render: (isActive) => {
//         return (
//           <>
//             {isActive ? (
//               <Tag color="green">Active</Tag>
//             ) : (
//               <Tag color="red">Inactive</Tag>
//             )}
//           </>
//         );
//       },
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record: DCDataInterface) => (
//         <>
//           <span className="hidden sm:block">
//             <Space size="middle">
//               <Button onClick={() => handleEdit(record._id)}>
//                 <MdEdit />
//                 Edit
//               </Button>
//               <Button onClick={() => handleDelete(record._id)}>
//                 <MdDelete />
//                 Delete
//               </Button>
//             </Space>
//           </span>
//           <span className="block flex gap-4 sm:hidden">
//             <MdEdit
//               className="text-indigo-800"
//               onClick={() => handleDelete(record._id)}
//             />
//             <MdDelete
//               className="text-red-500"
//               onClick={() => handleDelete(record._id)}
//             />
//           </span>
//         </>
//       ),
//     },
//   ];
//   return columns;
// };

export const REPORTS_COLUMNS = ({
  handleEdit,
  handleDelete,
  handlePreview,
}) => [
  {
    key: 'testName',
    title: 'Test Name',
    dataIndex: 'testName',
    render: (text: any) => <a>{text}</a>,
    sorter: (a: any, b: any) =>
      a.sampleType?.testName?.length - b.sampleType?.testName?.length,
  },
  {
    key: 'sampleName',
    title: 'Sample Name',
    dataIndex: 'sampleName',
    render: (text: any) => <a>{text}</a>,
    sorter: (a: any, b: any) =>
      a.sampleType?.sampleName?.length - b.sampleType?.sampleName?.length,
  },
  {
    key: 'parameter',
    title: 'Parameters',
    dataIndex: 'parameters',
    render: (parameters: any, record: any) => (
      <div
        style={{
          maxWidth: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '5px',
          padding: '10px',
          border: '1px solid #e8e8e8',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        {parameters?.map((param: any, index: any) => (
          <a key={index} href="#">
            <Popover content={getPopOver(param)} title="Parameter Aliases">
              <Tag
                style={{
                  fontSize: '12px', // Making tags smaller
                  padding: '2px 8px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100px', // Limiting the width for smaller space
                }}
                color="green"
                key={param}
              >
                {param?.name}
              </Tag>
            </Popover>
          </a>
        ))}
      </div>
    ),
  },
  {
    key: 'components',
    title: 'Components',
    dataIndex: 'components',
    render: (components: any, record: any) => (
      <div
        style={{
          maxWidth: '20vw',
          maxHeight: 'calc(3 * 20px + 2px)',
          overflowY: 'auto',
        }}
      >
        <ComponentsDisplay components={components} />
      </div>
    ),
  },
  {
    key: 'isActive',
    title: 'Status',
    dataIndex: 'isActive',
    sorter: (a: any, b: any) =>
      a.sampleType?.keywords.length - b.sampleType?.keywords.length,
    render: (text: any) => {
      if (text) {
        return <Tag color="green">Active</Tag>;
      } else {
        return <Tag color="red">Inactive</Tag>;
      }
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      return (
        <Space size="middle">
          <a
            onClick={() => {
              handlePreview(record);
            }}
            className="text-orange-700"
          >
            <FaEye className="w-4 text-green-900" />
          </a>
          <a href="#">
            <FaEdit
              className="text-red-gray"
              onClick={() => handleEdit(record)}
            />
          </a>
          <a href="#">
            <FaTrash
              className="text-red-500"
              onClick={() => handleDelete(record)}
            />
          </a>
        </Space>
      );
    },
  },
];

export const REPORTS_PARAM_COLUMNS = ({ handleEdit, handleDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 60,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <div className="max-w-[150px]">{text}</div>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 100,
      render: (text) => {
        // Split the text into words
        const words = text?.split(' ');
        // Take the first 4 words and join them back into a string for preview
        const preview =
          words?.slice(0, 4).join(' ') + (words?.length > 4 ? '...' : '');
        // Prepare the full content for the popover
        const fullContent = (
          <div
            style={{
              maxWidth: 300,
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
          >
            {text}
          </div>
        );
        return (
          <Popover content={fullContent} title="Description" trigger="hover">
            <div style={{ cursor: 'pointer' }}>{preview}</div>
          </Popover>
        );
      },
    },
    {
      title: 'Remedy',
      dataIndex: 'remedy',
      key: 'remedy',
      render: (text) => (
        <div
          style={{ width: 100, wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      ),
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      render: (text, record) => <ParameterUnitsColumn data={record} />,
    },
    {
      title: 'Aliases',
      dataIndex: 'aliases',
      key: 'aliases',
      render: (aliases) => {
        let moreDots = false;
        if (aliases?.length > 3) {
          aliases = aliases.slice(0, 3);
          moreDots = true;
        }
        return (
          <Space
            className="w-[auto] uppercase lg:w-[10vw]"
            style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
            onMouseEnter={() => {}}
            size={[0, 1]}
            wrap
          >
            {aliases?.map((alias) => (
              <Tag
                className="sm:text-md p-[1px] text-[8px] sm:px-4 sm:text-[10px]"
                color="orange"
                key={alias}
              >
                {alias}
              </Tag>
            ))}
            {moreDots && <Tag color="geekblue">...</Tag>}
          </Space>
        );
      },
    },
    {
      title: 'BioRefRange',
      dataIndex: 'bioRefRange',
      key: 'bioRefRange',
      render: (bioRefRange, record) => {
        let moreDots = false;
        if (bioRefRange?.length > 3) {
          bioRefRange = bioRefRange.slice(0, 3);
          moreDots = true;
        }
        return (
          <>
            <Popover
              content={getContent(bioRefRange)}
              title="Bio Ref Range Details"
              trigger="hover"
            >
              <Tag color="blue">Reference value</Tag>
            </Popover>
          </>
        );
      },
    },
    {
      title: 'Parameter Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => {
        return (
          <>
            {isActive ? (
              <Tag color="green">Active</Tag>
            ) : (
              <Tag color="red">Inactive</Tag>
            )}
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: DCDataInterface) => (
        <>
          <span className="hidden sm:block">
            <Space size="middle">
              <Button onClick={() => handleEdit(record._id)}>
                <MdEdit />
                Edit
              </Button>
              <Button onClick={() => handleDelete(record._id)}>
                <MdDelete />
                Delete
              </Button>
            </Space>
          </span>
          <span className="block flex gap-4 sm:hidden">
            <MdEdit
              className="text-indigo-800"
              onClick={() => handleDelete(record._id)}
            />
            <MdDelete
              className="text-red-500"
              onClick={() => handleDelete(record._id)}
            />
          </span>
        </>
      ),
    },
  ];
  return columns;
};

export const REPORTS_SAMPLES_COLUMNS = ({ handleEdit, handleDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'validity',
      dataIndex: 'validity',
      key: 'validity',
      render: (validity) => {
        return (
          <>
            <p>{formatValidity(validity)}</p>
          </>
        );
      },
    },
    {
      title: 'Sample Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => {
        return (
          <>
            {isActive ? (
              <Tag color="green">Active</Tag>
            ) : (
              <Tag color="red">Inactive</Tag>
            )}
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: DCDataInterface) => (
        <>
          <span className="hidden sm:block">
            <Space size="middle">
              <Button onClick={() => handleEdit(record._id)}>
                <MdEdit />
                Edit
              </Button>
              <Button onClick={() => handleDelete(record._id)}>
                <MdDelete />
                Delete
              </Button>
            </Space>
          </span>
          <span className="block flex gap-4 sm:hidden">
            <MdEdit
              className="text-indigo-800"
              onClick={() => handleDelete(record._id)}
            />
            <MdDelete
              className="text-red-500"
              onClick={() => handleDelete(record._id)}
            />
          </span>
        </>
      ),
    },
  ];
  return columns;
};

export function DataWithKeys(data) {
  if (data && data.length > 0) {
    const dataSourceWithKeys =
      //@ts-ignore
      data?.length > 0 &&
      //@ts-ignore
      data?.map((record: any, index) => ({
        ...record,
        key: record.key || record._id || index,
      }));
    return dataSourceWithKeys;
  }
  return [];
}

function formatValidity(validity) {
  const units = [
    { key: 'year', label: 'year' },
    { key: 'month', label: 'month' },
    { key: 'week', label: 'week' },
    { key: 'day', label: 'day' },
    { key: 'hour', label: 'hour' },
    { key: 'minute', label: 'minute' },
  ];

  const parts = units
    .filter((unit) => validity[unit.key] > 0)
    .map((unit) => {
      const value = validity[unit.key];
      return `${value} ${unit.label}${value > 1 ? 's' : ''}`;
    });

  return parts.join(' ');
}

const ParameterUnitsColumn = ({ data }) => {
  const [visibleUnits, setVisibleUnits] = useState([]);
  if (data) {
    const allUnits = extractUnitValues(data?.bioRefRange);

    const handlePopoverVisibleChange = (visible) => {
      if (visible) {
        setVisibleUnits(allUnits);
      } else {
        setVisibleUnits([]);
      }
    };

    const renderContent = () => (
      <Space wrap>
        {allUnits.map((unit, index) => (
          <Tag color="green" key={index}>
            {/* {unit ? unit:} */}
          </Tag>
        ))}
      </Space>
    );

    return (
      <Popover
        content={renderContent()}
        title="All Units"
        trigger="click"
        visible={visibleUnits.length > 0}
        onVisibleChange={handlePopoverVisibleChange}
      >
        <Tag color="green" style={{ cursor: 'pointer' }}>
          Show Units
        </Tag>
      </Popover>
    );
  } else {
    <p>null</p>;
  }
};

// Function to extract unique unit values
const extractUnitValues = (bioRefRange) => {
  const units = new Set();

  // Extract units from advanceRange
  const { advanceRange } = bioRefRange;
  // Object.values(advanceRange).forEach((ranges) => {
  //   // ranges.forEach((range) => {
  //   //   units.add(range.unit);
  //   // });
  // });

  // Extract units from basicRange
  const { basicRange } = bioRefRange;
  basicRange.forEach((range) => {
    units.add(range.unit);
  });

  return Array.from(units);
};

export const getContent = (bioRefRange) => {
  // Helper function to format range string based on available min and max values
  const formatRange = (min, max, unit) => {
    if (min && max) {
      return `${min} > and < ${max} ${unit || ''}`;
    } else if (min) {
      return `> ${min} ${unit || ''}`;
    } else if (max) {
      return `< ${max} ${unit || ''}`;
    }
  };

  // Determine if there's data for the advanced range to decide on displaying the section
  const hasAdvancedData =
    bioRefRange.advanceRange &&
    (bioRefRange.advanceRange.ageRange?.length > 0 ||
      bioRefRange.advanceRange.genderRange?.length > 0 ||
      bioRefRange.advanceRange.customCategory?.length > 0);

  return (
    <div style={{ maxHeight: '50vh', overflowY: 'auto', padding: '0 10px' }}>
      {/* Basic Range */}
      {bioRefRange.basicRange &&
        bioRefRange.basicRange.map((basic, basicIndex) => (
          <div key={basicIndex} className="mb-4">
            <p className="font-bold">Basic Range:</p>
            <p>{formatRange(basic.min, basic.max, basic.unit)}</p>
          </div>
        ))}

      {/* Advanced Range - Conditional rendering based on hasAdvancedData */}
      {hasAdvancedData && (
        <div>
          <p className="font-bold">Advanced Range:</p>
          <div className="ml-2">
            {/* Age Range */}
            {bioRefRange.advanceRange.ageRange &&
              bioRefRange.advanceRange.ageRange.map((age, ageIndex) => (
                <div key={ageIndex}>
                  <p>Age Range:</p>
                  <p className="ml-4">{`${age.ageRangeType}: ${formatRange(
                    age.min,
                    age.max,
                    age.unit,
                  )}`}</p>
                </div>
              ))}

            {/* Gender Range */}
            {bioRefRange.advanceRange.genderRange &&
              bioRefRange.advanceRange.genderRange.map(
                (gender, genderIndex) => (
                  <div key={genderIndex}>
                    <p>Gender Range:</p>
                    <p className="ml-4">{`${
                      gender.genderRangeType
                    } Range: ${formatRange(
                      gender.min,
                      gender.max,
                      gender.unit,
                    )}`}</p>
                    {gender.genderRangeType === 'female' && gender.details && (
                      <div className="ml-6">
                        <p>Details:</p>
                        <div className="ml-6">
                          {gender.details.menopause && <p>Menopause: Yes</p>}
                          {gender.details.prePuberty && <p>Pre-Puberty: Yes</p>}
                          {gender.details.pregnant && (
                            <>
                              <p>Pregnant: Yes</p>
                              {gender.details.trimester &&
                                gender.details.trimester?.type !== 'none' && (
                                  <p className="ml-6">
                                    Trimester: {gender.details.trimester?.type}
                                  </p>
                                )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ),
              )}

            {/* Custom Category */}
            {bioRefRange.advanceRange.customCategory &&
              bioRefRange.advanceRange.customCategory.map(
                (category, catIndex) => (
                  <div key={catIndex}>
                    <p className="font-bold">Custom Range:</p>
                    <p>{category.categoryName}</p>
                    {category.categoryOptions &&
                      category.categoryOptions.map((option, optIndex) => (
                        <p key={optIndex} className="ml-4">{`${
                          option.categoryType
                        }: ${formatRange(
                          option.min,
                          option.max,
                          option.unit,
                        )}`}</p>
                      ))}
                    {category.subCategory && (
                      <div className="ml-4">
                        <p>{category.subCategory.categoryName}</p>
                        {category.subCategory.categoryOptions &&
                          category.subCategory.categoryOptions.map(
                            (subOpt, subOptIndex) => (
                              <p key={subOptIndex} className="ml-4">{`${
                                subOpt.categoryType
                              }: ${formatRange(
                                subOpt.min,
                                subOpt.max,
                                subOpt.unit,
                              )}`}</p>
                            ),
                          )}
                      </div>
                    )}
                  </div>
                ),
              )}
          </div>
        </div>
      )}
    </div>
  );
};

const ComponentsDisplay = ({ components }) => {
  return (
    <div>
      {components?.map((param, index) => (
        <a key={index} href="#">
          <Popover content={getPopOvers(param)} title={param?.title}>
            <Tag className="my-1" color="green" key={param._id}>
              {param?.title || 'Untitled Component'}
            </Tag>
          </Popover>
        </a>
      ))}
    </div>
  );
};

const getPopOver = (param: any) => (
  <div className="max-w-[25vw]">
    <p>
      <strong>Name</strong>: {param?.name}
    </p>
    <p
    // style={{ width: "30vw", wordWrap: "break-word", whiteSpace: "pre-wrap" }}
    // className="overflow-hidden whitespace-nowrap w-[30vw]"
    >
      <strong>Description</strong>: {param?.description}
    </p>
    <p>
      <strong>Aliases</strong>: {param?.aliases?.join(', ')}
    </p>
    <p>
      <strong>IsActive</strong>: {param?.isActive ? 'Yes' : 'No'}
    </p>
    <p>
      <strong>BioRefRange</strong>:{getContent(param?.bioRefRange)}
    </p>
  </div>
);

const getPopOvers = (param) => {
  return (
    <div className="w-[60vw]">
      <div
        className="w-[60vw]"
        dangerouslySetInnerHTML={{
          __html: param.content || 'No content available',
        }}
      ></div>
    </div>
  );
};

export const PARAMETER_COLUMNS = ({ handleEdit, handleDelete }) => [
  {
    title: 'Parameter',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => (
      <div
        style={{
          maxWidth: 100,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={text}
      >
        {text}
      </div>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (text) => (
      <div
        style={{
          maxWidth: 100,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={text}
      >
        {text}
      </div>
    ),
  },
  {
    title: 'Remedy',
    dataIndex: 'remedy',
    key: 'remedy',
    render: (text) => (
      <div
        style={{
          maxWidth: 100,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={text}
      >
        {text}
      </div>
    ),
  },
  // {
  //   title: "Unit",
  //   dataIndex: "units",
  //   key: "units",
  //   width: 100,
  //   render: (_, record) => (
  //     <Popover title="Units" trigger="hover">
  //       <div >
  //         <ParameterUnitsColumn data={record} />
  //       </div>
  //     </Popover>
  //   ),
  // },
  {
    title: 'Alias',
    dataIndex: 'aliases',
    key: 'aliases',
    render: (aliases = []) => {
      const displayAliases = aliases.slice(0, 3);
      const moreDots = aliases.length > 3;

      return (
        <Popover content={aliases.join(', ')} title="Aliases" trigger="hover">
          <Space size={[0, 1]} wrap>
            {displayAliases.map((alias) => (
              <Tag color="geekblue" key={alias}>
                {alias}
              </Tag>
            ))}
            {moreDots && <Tag color="geekblue">...</Tag>}
          </Space>
        </Popover>
      );
    },
  },
  {
    title: 'Bio Ref',
    dataIndex: 'bioRefRange',
    key: 'bioRefRange',
    width: 100,
    render: (bioRefRange = []) => {
      // const displayBioRefRange = bioRefRange?.length>0 && bioRefRange?.slice(0, 3);
      return (
        <Popover
          content={getContent(bioRefRange)}
          title="Bio Ref Range Details"
          trigger="hover"
        >
          <div
            style={{
              maxWidth: 130,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <Tag color="blue">Reference value</Tag>
          </div>
        </Popover>
      );
    },
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
    filters: [
      { text: 'Active', value: true },
      { text: 'Inactive', value: false },
    ],
    onFilter: (value, record) => record.isActive === value,
    render: (isActive) => (
      <Tag color={isActive ? 'green' : 'red'}>
        {isActive ? 'Active' : 'Inactive'}
      </Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>
          <FaEdit
            className="text-red-gray"
            onClick={() => handleEdit(record)}
          />
        </a>
        <a>
          <FaTrash
            className="text-red-500"
            onClick={() => handleDelete(record)}
          />
        </a>
      </Space>
    ),
  },
];
