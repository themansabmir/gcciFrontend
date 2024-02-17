import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DataTable } from "../../../components/DataTable/DataTable";
import { useGetCustomer } from "../../../hooks/useGetCustomer";
const Customer = () => {
  const [keys, setKeys] = useState("");

  const { data, paginationModel, count, setPaginationModel, handlePagination } =
    useGetCustomer(keys);

  const navigate = useNavigate();

  const columns = [
    {
      field: "companyName",
      width: 150,
      headerName: "Company Name",
      headerClassName: "font-semibold",
    },
    {
      field: "email",
      width: 250,
      headerName: "Email",
      headerClassName: "font-semibold",
    },
    {
      field: "mobileNumber",
      width: 150,
      headerName: "Mobile",
      headerClassName: "font-semibold",
    },
    {
      field: "telephoneNumber",
      width: 150,
      headerName: "Telephone",
      headerClassName: "font-semibold",
    },
    {
      field: "panNumber",
      width: 150,
      headerName: "PAN",
      headerClassName: "font-semibold",
    },

    {
      field: "_id",
      minWidth: 250,
      headerName: "Actions",
      renderCell: ({row}) => {
        const { _id}= row
        return (
          <div className='flex gap-4 w-full'>
            <button onClick={() => navigate("/masters/view/"+_id)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
            </button>
            {/* <button>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='w-4 h-4'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                />
              </svg>
            </button> */}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Link to={"/masters/createcustomer"}>
        <h1>Create Customer</h1>
      </Link>

      <div>
        {data && (
          <DataTable
            paginationModel={paginationModel}
            setPaginationModel={handlePagination}
            columns={columns || []}
            count={count}
            rows={data}
            keys={keys}
            setKeys={setKeys}
            componentName={"Customers"}
          />
        )}
      </div>
    </div>
  );
};

export default Customer;
