import React, { useState } from 'react'

const Field = ({ props, name , address, label}) => {


 const {
    customerData, searchHandler , handleClick
  } = props



  const filter=[...customerData]

  const [result, setResult] = useState()
const [open, setOpen]= useState(false)
  return (
      <div className='flex flex-col'>
      <label htmlFor=""> { label }</label>
      <textarea name="" id="" cols="30" rows="5" className='w-max' value={result} onChange={(e) => {
        searchHandler(e.target.value)
        setResult(e.target.value)
        setOpen(true)
      }}></textarea>
      <div><ul>
        {open && result && filter.map((item, i) => (
          item.customerAddress.map((elem, index) => {
            return <li className='hover:bg-gray-200 ' data-name={name} data-address={address} onClick={(e) => {
              handleClick(item, e)
              setOpen(false)
              setResult(`${item.companyName} ${item._id} ${elem._id}`)
            }}> {item.companyName} { elem.city} </li>
          })
      ))}
      </ul></div>
   </div>
  )
}

export default Field