import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCustomer } from "../features/customerSlice";
import Field from "./Field";

const Test = () => {
  const dispatch= useDispatch()
  const customerData = useSelector((state) => state.customer.customerData)


  const searchHandler = (e) => {
    console.log(e)
    dispatch(searchCustomer(e))
  }

  const [data, setData] = useState([{
    name: "",
    age:""
  }])

  const handleClick = (item,e) => {
    // console.log(e)
    const { name, address } = e.target.dataset

    console.log(name, address)
    const arr = [...data]
    

  }
  const props = {
    customerData,
    searchHandler,
    handleClick,

  }

  return (
    <div>
      <Field props={props} name={"shipperName"} address={"shipperAddress" } />
 </div>
  );
};

export default Test;
