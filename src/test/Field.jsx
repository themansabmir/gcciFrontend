import React, { useState } from 'react'

const Field = ({ props, name , address}) => {


 const {
    customerData, searchHandler , handleClick ,
  } = props

  console.log(name , address)
  const [result, setResult] = useState("dd")

  return (
      <div className='flex flex-col'>
      <label htmlFor=""> { null ||"search"}</label>
      <textarea name="" id="" cols="30" rows="5" className='w-max' onChange={(e) => { searchHandler(e.target.value) }}></textarea>
      <div><ul>
        {customerData.map((item, i) => (
          <li className='hover:bg-gray-200 ' data-name={name} data-address={address} onClick={(e) => {handleClick(item,e) }}> { item.companyName} </li>
      ))}
      </ul></div>
   </div>
  )
}

export default Field