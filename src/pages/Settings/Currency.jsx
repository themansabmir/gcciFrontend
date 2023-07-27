import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCurrency, getCurrencies } from "../../features/currencySlice";
import Table from "../../components/Table/Table";

const Currency = () => {
  const dispatch = useDispatch();
    const currencies = useSelector((state) => state.currency.currencyData);
  const [currencyData, setCurrencyData] = useState({
    currencyName: "",
    currencyCode: "",
    currencySymbol: "",
  });

  const handleChange = (e) => {
    setCurrencyData({ ...currencyData, [e.target.name]: e.target.value });
  };
  const currencyHandler = (e) => {
    e.preventDefault();
    dispatch(createCurrency(currencyData));
  };

    const currencyColumns = [
      {
        header: "S.No",
        accessorKey: "_id",
        cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        header: "Currency Name",
        accessorKey: "currencyName",
      },
      {
        header: "Code",
        accessorKey: "currencyCode",
      },
      {
        header: "Symbol",
        accessorKey: "currencySymbol",
      },
      {
        header: "S.No",
        accessorKey: "createdAt",
        cell: ({ row }) => <span>{row.index + 1}</span>,
      },
    ];
  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);

  return (
    <div className='grid grid-cols-3 ml-2 mt-2'>
      {/* currency form   */}
      <div className="col-span-1">
        <h1 className='flex  text-2xl font-semibold uppercase '>
          Add New Currency
        </h1>

        <div className='w-full bg-gray-100  shadow-md mt-6 '>
          <form
            onSubmit={currencyHandler}
            className='w-full flex flex-col py-6 '
          >
            <div className='flex-col flex px-8'>
              <label className=' text-gray-700 text-lg font-bold mb-2 mr-6'>
                Currency Name
              </label>
              <input
                className='"shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                type='text'
                name='currencyName'
                value={currencyData.currencyName}
                onChange={handleChange}
                id=''
              />
            </div>

            <div className='flex-col flex px-8'>
              <label className=' text-gray-700 text-lg font-bold mb-2 mr-6'>
                Currency Code
              </label>
              <input
                className='"shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                type='text'
                name='currencyCode'
                onChange={handleChange}
                value={currencyData.currencyCode}
                id=''
              />
            </div>
            <div className='flex-col flex px-8'>
              <label className=' text-gray-700 text-lg font-bold mb-2 mr-6'>
                Currency Symbol
              </label>
              <input
                className='"shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                type='text'
                name='currencySymbol'
                value={currencyData.currencySymbol}
                onChange={handleChange}
                id=''
              />
              <button className='bg-primary py-2 text-xl font-bold mt-4 text-white uppercase rounded hover:scale-95 transition-all duration-300 ease-in'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* currency table  */}
      <div className="col-span-2">
        <h1 className='flex  text-2xl font-semibold uppercase '>
          Curreny List In Database
        </h1>
        <div className='ml-2 bg-gray-100 shadow-md '>
          <div className='mt-6'>
            {currencies ? (
              <Table columns={currencyColumns} data={currencies} />
            ) : (
              "Add Currencies To See Records"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Currency;
