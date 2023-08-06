import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCustomer } from "../features/customerSlice";
import Field from "./Field";

const Test = () => {
  const dispatch= useDispatch()
  const customerData = useSelector((state) => state.customer.customerData)


  const searchHandler = (e) => {

    dispatch(searchCustomer(e))
  }

  const [data, setData] = useState([{
    shipperName: "",
    shipperAddress: "e",
    email:""  
  }])

  const handleClick = (item,e) => {

    const { name, address } = e.target.dataset


    const arr = [...data]

    arr[0][name] = item._id
    arr[0][address]= item.customerAddress[0]._id
    setData(arr)



  }
  const props = {
    customerData,
    searchHandler,
    handleClick,

  }

  return (
    <div>
      <Field props={props} name={"shipperName"} address={"shipperAddress" } />
      <Field props={props} label="Consignee" name={"email"} address={"shipperAddress" } />
 </div>
  );
};

export default Test;
