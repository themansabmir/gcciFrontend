import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
const Table = ({ data, columns , styles}) => {
  const [filter, setFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
    },
    onGlobalFilterChange: setFilter,
  });

  return (
    <div>
      <div className="flex gap-4 ">

        <input
          className='w-60 border-2 pt-2 border-gray-900 bg-mainBg focus:outline-none focus:border-teal-700 outline-none text-black font-semibold'
          type='text'
          placeholder="Search.."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <table className='w-full bg-white  text-[#333547] '>
        <thead>
          {data &&
            table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className='bg-gray-100'>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className='font-semibold p-4 text-start'>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}

              className={styles? styles :'border-b border-b-gray-300 hover:border-l-8  hover:border-l-green-500 last:border-0 hover:bg-gray-50 cursor-pointer  '}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='py-2 font-normal px-4'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-between mx-8 my-2 pb-4'>
        <button
          disabled={!table.getCanPreviousPage()}
          className='px-4 py-2 bg-font rounded-md text-white uppercase'
          onClick={() => table.previousPage()}
        >
          Previous
        </button>
        <button
          disabled={!table.getCanNextPage()}
          className='px-4 py-2 bg-font rounded-md text-white uppercase'
          onClick={() => table.nextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
