import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
export const DataTable = ({
  componentName,
  rows,
  columns,
  setKeys,
  count,
  keys,
  paginationModel,
  setPaginationModel,
}) => {
  return (
    <>
      <div className=' flex justify-between items-center'>
        <h1>{componentName}</h1>
        <div className='w-60'>
          <Input
            onChange={(e) => setKeys(e.target.value)}
            value={keys}
            variant='standard'
            size='md'
            placeholder='Server Search'
            label='Server search'
            className='w-48'
          />
        </div>
      </div>
      <div className='mx-4'>
        <DataGrid
          sx={{
            backgroundColor: "white",
            borderRadius: 0,
          }}
          rows={rows}
          rowCount={count}
          pageSizeOptions={[30, 100, 200]}
          density="compact"
          columns={columns}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          slots={{ toolbar: GridToolbar }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </div>
    </>
  );
};
