import React from 'react'

const DataCard = ({title, value, icon}) => {
  return (
      <div className='border-l-4 border-l-teal-500 flex justify-between  px-4 bg-white shadow-md shadow-gray-800 rounded-md  min-h-[100px] '>
          <div>
              <h1 className='font-medium text-teal-500 mb-2 mt-3'>{title}</h1>
              <h3 className='text-gray-700 font-bold '>{value }</h3>
          </div>
          <div>
              {icon}
          </div>
   </div>
  )
}

export default DataCard