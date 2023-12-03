import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { handleFileSelect } from "../../utils/utility";
import SearchDropDown from "../SearchDropDown/SearchDropDown";
import { useDispatch, useSelector } from "react-redux";
import { customersData, getCustomer } from "../../features/customerSlice";
import { createInsights } from "../../features/insightSlice";

const customKeys = [
  "originPortName",
  "shippingNumber",
  "shippingBillDate",
  "chaNumber",
  "destinationPortName",
  "package",
  "grossWeight",
  "containerNumber",
  "igstPaid",
  "gatewayPortName",
  "shippingLine",
  "type",
  "originPortCode",
  "destinationPortCode",
  "gatewayPortCode",
  "customerId",
];

const ExcelReader = () => {
  const dispatch = useDispatch();

  const customers = useSelector(customersData);

  const [file, setFile] = useState("");
  const [customer, setCustomer] = useState("");
  const handleFileChange = (e) => {
    handleFileSelect(XLSX, e.target.files[0], customKeys, setFile);
  };

  const submitHandler = (e) => {


    const data = file.map((item) => ({ ...item, customerId: customer }));
    
    dispatch(createInsights(data));
  };

  useEffect(() => {
    dispatch(getCustomer());
  }, []);

  return (
    <div>
      <select
        name='customers'
        id=''
        onChange={(e) => setCustomer(e.target.value)}
      >
        <option value=''> Select Customer</option>
        {customers &&
          customers.map((customer) => {
            const { companyName, _id } = customer;
            return <option value={_id}> {companyName}</option>;
          })}
      </select>

      <input type='file' name='excel' onChange={handleFileChange} />
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
};

export default ExcelReader;
