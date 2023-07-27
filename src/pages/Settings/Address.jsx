import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import {createAddress, getAddress} from '../../features/addressSlice'
const Address = () => {
  const dispatch=useDispatch()
  const addressColumns = [
    {
      header: "S.NO",
      accessorKey: "_id",
      cell: ({ row }) => <span>{ row.index+1}</span>
    },
    {
      header: "City",
      accessorKey: "city",
    },
    {
      header: "Country",
      accessorKey: "country",
    },
    {
      header: "GST Number",
      accessorKey: "gstNumber",
    },
  ];
  const address = useSelector(state=> state.address.addressData);

  const [addressData, setAddressData] = useState({
    city: "",
    state: "",
    address: "",
    pinCode: "",
    country: "",
    gstNumber: "",
  });

  const handleChange = (e) => {
    setAddressData({...addressData, [e.target.name]:e.target.value})
  };


  const addressHandler = (e) => {
    e.preventDefault()

    dispatch(createAddress(addressData))
    resetState()

  };
  function resetState() {
  setAddressData({
    city: "",
    state: "",
    address: "",
    pinCode: "",
    country: "",
    gstNumber: "",
  });
  }

  useEffect(() => {
    dispatch(getAddress())
  },[dispatch])

  return (
    <div className='grid grid-cols-3 ml-2 mt-2'>
      {/* currency form   */}
      <div className='col-span-1'>
        <h1 className='flex  text-2xl font-semibold uppercase '>
          Add New Address
        </h1>

        <div className='w-full bg-gray-100  shadow-md mt-6 '>
          <form
            onSubmit={addressHandler}
            className='w-full flex flex-col py-6 '
          >
            <div className='flex-col flex px-8'>
              <label className=' text-gray-700 text-lg font-bold mb-2 mr-6'>
                Address
              </label>
              <input
                className='"shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                type='text'
                name='address'
                value={addressData.address}
                onChange={handleChange}
                id=''
              />
            </div>

            <div className='flex-col flex px-8'>
              <label className=' text-gray-700 text-lg font-bold mb-2 mr-6'>
                City
              </label>
              <input
                className='"shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                type='text'
                name='city'
                onChange={handleChange}
                value={addressData.city}
                id=''
              />
            </div>
            <div className='flex-col flex px-8'>
              <label className=' text-gray-700 text-lg font-bold mb-2 mr-6'>
                State
              </label>
              <input
                className='"shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                type='text'
                name='state'
                onChange={handleChange}
                value={addressData.state}
                id=''
              />
            </div>
            <div className='flex-col flex px-8'>
              <label className=' text-gray-700 text-lg font-bold mb-2 mr-6'>
                Country
              </label>
              <input
                className='"shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                type='text'
                name='country'
                onChange={handleChange}
                value={addressData.country}
                id=''
              />
            </div>
            <div className='flex-col flex px-8'>
              <label className=' text-gray-700 text-lg font-bold mb-2 mr-6'>
                Pincode
              </label>
              <input
                className='"shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                type='text'
                name='pinCode'
                onChange={handleChange}
                value={addressData.pinCode}
                id=''
              />
            </div>
            <div className='flex-col flex px-8'>
              <label className=' text-gray-700 text-lg font-bold mb-2 mr-6'>
                GST Number
              </label>
              <input
                className='"shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                type='text'
                name='gstNumber'
                onChange={handleChange}
                value={addressData.gstNumber}
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
      <div className='col-span-2'>
        <h1 className='flex  text-2xl font-semibold uppercase '>
          Address In Database
        </h1>
        <div className='ml-2 bg-gray-100 shadow-md '>
          <div className='mt-6'>
            {address ? (
              <Table columns={addressColumns} data={address} />
            ) : (
              "Add Currencies To See Records"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
