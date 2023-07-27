import React, { useEffect, useState } from 'react'
import { PiGearSix } from 'react-icons/pi'
import Table from '../../components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { createRole, getRoles } from '../../features/rolesSlice';
import Port from './Port';
import Currency from './Currency';
import Address from './Address';





const Settings = () => {
  const dispatch = useDispatch()
  const rolesData = useSelector((state) => state.roles.rolesData)

  const [roleName, setRoleName] = useState("")

  const roleHandler = (e) => {
    e.preventDefault()
    dispatch(createRole({roleName}))


  }



  const roleColumns = [
    {
      header: 'ID',
      accessorKey: "",
      cell: ({ row }) => <span>{ row.index+1}</span>
    },
    {
      header: "Role Title",
      accessorKey: "roleName",

    },
    {
      header: "Actions",
      accessorKey: "",
      cell: ({ row }) => <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    }
]



  useEffect(() => {

    dispatch(getRoles())
  },[dispatch]);

  return (
    <div className='container'>
      {/* settings section header */}
      <div className='bg-slate-100 p-4 flex justify-between items-center '>
        <h1 className='flex text-4xl items-center gap-2 font-semibold'>
          <PiGearSix /> Settings
        </h1>
        <div>
          <img src='' className='h-16 w-16 rounded-full' alt='' />
        </div>
      </div>

      {/*  for adding roles section */}
      <div className='grid grid-cols-3 gap-2 mx-4  '>
        {/* form section  */}
        <div className='flex items-center col-span-1 flex-col'>
          <h1 className='text-2xl font-semibold bg-primary text-white text-center w-full'>Add New Role</h1>
          <form onSubmit={roleHandler} className='w-full'>
            <div className='mt-6 bg-gray-100 flex-col flex shadow-md shadow-gray-800 px-8 py-4  w-full'>
              <label className=' text-gray-700 text-lg font-bold mb-2 mr-6'>
                Role Title
              </label>
              <input
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                type='text'
                className='"shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
              />
              <button className='bg-primary py-2 text-xl font-bold mt-4 text-white uppercase rounded hover:scale-95 transition-all duration-300 ease-in'>
                submit
              </button>
            </div>
          </form>
        </div>

        {/* table section for roles  */}
        <div className='ml-2 col-span-2 '>
          <h1 className='text-2xl font-semibold bg-primary text-white text-center'>Roles present in company</h1>
          <div className='mt-6'>
            {rolesData ? (
              <Table columns={roleColumns} data={rolesData} />
            ) : (
              "Add Roles To See Collection"
            )}
          </div>
        </div>
      </div>
      <Port />
      <Currency />
      <Address />
    </div>
  );
}

export default Settings