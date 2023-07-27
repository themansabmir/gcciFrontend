import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getPorts, createPort} from '../../features/portSlice'
import Table from '../../components/Table/Table'
const Port = () => {
  const dispatch = useDispatch()

  const ports = useSelector(state=> state.port.portData)


  const [portData, setPortData] = useState({
    portName: "",
    portCode:""
  })


  const handleChange = (e) => {
setPortData({...portData, [e.target.name]:e.target.value})
  }

  const portHandler = (e) => {
    e.preventDefault()
    dispatch(createPort(portData))

    setPortData({
      portName: "",
      portCode:""
    })

  }


    const portColumns = [
      {
        header: "ID",
        accessorKey: "",
        cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        header: "Port Name",
        accessorKey: "portName",
      },
      {
        header: "Port Code",
        accessorKey: "portCode",
      },
      {
        header: "Actions",
        accessorKey: "",
        cell: ({ row }) => (
          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ),
      },
    ];

  useEffect(() => {
    dispatch(getPorts())
  },[dispatch])
  return (
    <div className='grid grid-cols-3 ml-2 mt-2'>
      {/* port form   */}
      <div className='col-span-1'>
        <h1 className='flex  text-2xl font-semibold uppercase '>
          Add New Port
        </h1>

        <div className='w-full bg-gray-100  shadow-md mt-6 '>
          <form onSubmit={portHandler} className='w-full flex flex-col py-6 '>
            <div className='flex-col flex px-8'>
              <label className=' text-gray-700 text-lg font-bold mb-2 mr-6'>
                Port Name
              </label>
              <input
                className='"shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                type='text'
                name='portName'
                value={portData.portName}
                onChange={handleChange}
                id=''
              />
            </div>
            <div className='flex-col flex px-8'>
              <label className=' text-gray-700 text-lg font-bold mb-2 mr-6'>
                Port Code
              </label>
              <input
                className='"shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                type='text'
                name='portCode'
                onChange={handleChange}
                value={portData.portCode}
                id=''
              />
              <button className='bg-primary py-2 text-xl font-bold mt-4 text-white uppercase rounded hover:scale-95 transition-all duration-300 ease-in'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* port table  */}
      <div className='col-span-2'>
        <h1 className='flex  text-2xl font-semibold uppercase '>
          Port List In Databse
        </h1>
        <div className='ml-2 bg-gray-100 shadow-md '>
          <div className='mt-6'>
            {ports ? (
              <Table columns={portColumns} data={ports} />
            ) : (
              "Add Roles To See Collection"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Port