'use client';
import tableDataDevelopment from '@variables/data-tables/tableDataDevelopment';
import tableDataCheck from '@variables/data-tables/tableDataCheck';
import CheckTable from '@src/components/admin/backup/data-tables/CheckTable';
import tableDataColumns from '@variables/data-tables/tableDataColumns';
import tableDataComplex from '@variables/data-tables/tableDataComplex';
import DevelopmentTable from '@src/components/admin/backup/data-tables/DevelopmentTable';
import ColumnsTable from '@src/components/admin/backup/data-tables/ColumnsTable';
import ComplexTable from '@src/components/admin/backup/data-tables/ComplexTable';
import Admin from '../../../pages/dashboard/[[...index]]';

const Tables = () => {
  return (
    <Admin>
      <div>
        <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
          <DevelopmentTable tableData={tableDataDevelopment} />
          <CheckTable tableData={tableDataCheck} />
        </div>

        <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
          <ColumnsTable tableData={tableDataColumns} />

          <ComplexTable tableData={tableDataComplex} />
        </div>
      </div>
    </Admin>
  );
};

export default Tables;
