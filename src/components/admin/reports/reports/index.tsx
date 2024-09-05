import {
  useDeleteDC,
  useDeleteReport,
  useGetReports,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import ReportsTable from '../utils/table';
import { DataWithKeys, REPORTS_COLUMNS } from '../utils/columns';
import { useEffect, useState } from 'react';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import { AxiosResponse } from 'axios';
import { useActivityLogger } from '@src/components/logger';
import { Switch } from 'antd';
import SearchHeader from '../../adminUsers/userTable/header/search';
import PreviewComponent from './view';

const ReportsTab = () => {
  const { data: reportData, isLoading, refetch } = useGetReports();
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();
  const [showReport, setShowReport] = useState<Boolean>(false);
  const [filteredReport, setFilteredReport] = useState(reportData?.data);
  const [previewReportModalOpen, setPreviewReportModalOpen] = useState(false);
  const [previewRecord, setPreviewRecord] = useState({});

  const deleteReport = useDeleteReport({
    onSuccess: (resp: AxiosResponse) => {
      if (resp && resp.status === 200) {
        warningAlert2('Deleted Report successfully');
        invalidateQuery('reportData');
        logActivity({
          title: 'Deleted Report',
          description: resp?.data
            ? `Deleted ${resp.data.name} from reports`
            : 'Deleted Report',
          action: 'deleted',
        });
      }
    },
    onError: (err: Error) => {
      errorAlert('Report deleting failed');
    },
  });

  const handleEdit = (record: any) => {
    console.log(record);
  };

  const handleDelete = (record: any) => {
    if (record) {
      // @ts-ignore
      deleteReport?.mutate(record?._id);
    } else {
      errorAlert('Error Deleting Report');
    }
  };

  const handlePreview = (record) => {
    setPreviewRecord(record);
    setPreviewReportModalOpen(true);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const filterReport = (report, searchTerm) => {
    return report.testName?.toLowerCase().includes(searchTerm.toLowerCase());
  };

  useEffect(() => {
    setFilteredReport(reportData?.data);
  }, [reportData]);

  //@ts-ignore
  const dataSourceWithKeys = DataWithKeys(filteredReport);
  const columns = REPORTS_COLUMNS({ handleEdit, handleDelete, handlePreview });

  return (
    <div className="relative my-8">
      {/* Background overlay for grayed out effect when modal is open */}
      {previewReportModalOpen && (
        <div className="bg-black fixed inset-0 z-40 bg-opacity-50"></div>
      )}

      <section className="relative z-10 flex justify-between">
        <SearchHeader
          //@ts-ignore
          listData={reportData?.data || []}
          filterCriteria={filterReport}
          setFilteredList={setFilteredReport}
          placeholderText="Search by name"
        />
        <Switch
          onChange={(checked) => {
            setShowReport(checked);
          }}
          value={showReport}
          checkedChildren={'Add'}
          unCheckedChildren={'View'}
        />
      </section>

      {showReport ? (
        <section>{/* <AddVaccine handleShowDc={handleShowDc} /> */}</section>
      ) : (
        <section>
          <ReportsTable
            columns={columns || []}
            tableDataSource={
              // @ts-ignore
              dataSourceWithKeys?.length > 0 ? dataSourceWithKeys : []
            }
            isLoading={isLoading}
          />
        </section>
      )}

      {previewReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center shadow-xl">
          <PreviewComponent
            showPreview={previewReportModalOpen}
            onClose={() => setPreviewReportModalOpen(false)}
            record={previewRecord}
            isTest={true}
          />
        </div>
      )}
    </div>
  );
};

export default ReportsTab;
