import React from 'react';
import CardMenu from '@component/card/CardMenu';
import Card from '@component/card';
import Progress from '@component/progress';
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';

import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { ADMIN_ACTIVITY_RESP } from '@src/variables/data-tables/tableDataDevelopment';

type activityObj = {
  description: string;
  user: Object;
  timeStamp: string;
  action: string;
};

const columnHelper = createColumnHelper<activityObj>();

const formatDate = (timestamp) => {
  if (!timestamp) return '';

  const date = new Date(timestamp);

  // Format the day with suffix (e.g., "12th")
  const day = date.getDate();
  const suffix = ['th', 'st', 'nd', 'rd'][((day % 10) - 1) % 10] || 'th';
  const formattedDay = `${day}${suffix}`;

  // Format the month (e.g., "July")
  const month = date.toLocaleString('default', { month: 'long' });

  // Format the time (e.g., "10:53 PM")
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (((hours + 11) % 12) + 1).toString().padStart(2, '0');
  const formattedTime = `${formattedHours}:${minutes} ${period}`;

  return `${formattedDay} ${month} ${formattedTime}`;
};

// const columns = columnsDataCheck;
export default function ActivityTable(props: { tableData: any }) {
  const { tableData } = props;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columns = [
    //@ts-ignore
    columnHelper.accessor('title', {
      id: 'title',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Title</p>
      ),
      //@ts-nocheck
      cell: (info: CellContext<ADMIN_ACTIVITY_RESP, { userName: string }>) => (
        <p className="text-sm text-navy-700 dark:text-white">
          <span className="text-sm font-bold">
            {' '}
            {info.row.original.user?.userName + ' '}
          </span>
        </p>
      ),
    }),
    columnHelper.accessor('user', {
      id: 'user',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Description
        </p>
      ),
      cell: (info) => {
        // @ts-ignore
        return (
          <p className="text-sm italic text-navy-700 dark:text-white">
            <span className="text-sm font-bold">
              {/*@ts-ignore */}
              {info.row.original.user?.userName + ' '}
            </span>
            {/* <span className="text-sm">{info.row.original.action + ' '}</span> */}
            <span className="text-sm text-gray-700">
              {info.row.original?.description + ' on ' || ''}
            </span>
            <span className="text-sm text-orange-400">
              {formatDate(info.row.original?.timeStamp) + ' ' || ''}
            </span>
          </p>
        );
      },
    }),
    // columnHelper.accessor('status', {
    //   id: 'status',
    //   header: () => (
    //     <p className="text-sm font-bold text-gray-600 dark:text-white">
    //       STATUS
    //     </p>
    //   ),
    //   cell: (info) => (
    //     <div className="flex items-center">
    //       {info.getValue() === 'Approved' ? (
    //         <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
    //       ) : info.getValue() === 'Disable' ? (
    //         <MdCancel className="me-1 text-red-500 dark:text-red-300" />
    //       ) : info.getValue() === 'Error' ? (
    //         <MdOutlineError className="me-1 text-amber-500 dark:text-amber-300" />
    //       ) : null}
    //       <p className="text-sm font-bold text-navy-700 dark:text-white">
    //         {info.getValue()}
    //       </p>
    //     </div>
    //   ),
    // }),
    // columnHelper.accessor('date', {
    //   id: 'date',
    //   header: () => (
    //     <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
    //   ),
    //   cell: (info) => (
    //     <p className="text-sm font-bold text-navy-700 dark:text-white">
    //       {info.getValue()}
    //     </p>
    //   ),
    // }),
    // columnHelper.accessor('progress', {
    //   id: 'progress',
    //   header: () => (
    //     <p className="text-sm font-bold text-gray-600 dark:text-white">
    //       PROGRESS
    //     </p>
    //   ),
    //   cell: (info) => (
    //     <div className="flex items-center">
    //       <Progress width="w-[108px]" value={info.getValue()} />
    //     </div>
    //   ),
    // }),
  ];
  const table = useReactTable({
    data: defaultData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Recent Activities
        </div>
        <Link href="/dashboard/adminUsers">View All</Link>
        {/* <CardMenu /> */}
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
