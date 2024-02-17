import { InputLabel, TextField } from "@mui/material";
import { Button, Checkbox, Input, useSelect } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomer,
  customerType,
  customerTypeData,
} from "../../../features/customerSlice";
const test = [
  {
    name: "Company Name",
    key: "companyName",
  },
  {
    name: "Telephone Number",
    key: "telephoneNumber",
  },
  {
    name: "Mobile Number",
    key: "mobileNumber",
  },
  {
    name: "Email",
    key: "email",
  },
  {
    name: "Fax",
    key: "fax",
  },

  {
    name: "Pan Number",
    key: "panNumber",
  },
];

const customeraddress = [
  {
    city: "",
    state: "",
    address: "",
    pinCode: "",
    country: "",
    gstNumber: "",
  },
];

const CreateCustomer = () => {
  const customerTypePayload = useSelector(customerTypeData);
  const [customer, setCustomer] = useState({
    companyName: "",
    telephoneNumber: "",
    mobileNumber: "",
    email: "",
    fax: "",
    panNumber: "",
  });

  const [customerAddress, setCustomerAddress] = useState(customeraddress);

  const [customerTypeIds, setCustomerTypeIds] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const data = { ...customer };
    data[name] = value;
    setCustomer(data);
  };
  const handleCheckboxChange = (e, customertypeId) => {
    const newArr = [...customerTypeIds];
    const id = newArr.find((item) => item === customertypeId);
    if (!id) {
      newArr.push(customertypeId);
    } else {
      const indexOf = newArr.indexOf(id);
      newArr.splice(indexOf, 1);
    }

    setCustomerTypeIds(newArr);
  };

  const handleAddress = (e, index) => {
    const { name, value } = e.target;
    const data = [...customerAddress];
    data[index][name] = value;
    setCustomerAddress(data);
  };

  const addAddressForm = () => {
    // const arr = [...customerAddress];
    // console.log(arr);
    // arr.push(customeraddress[0]);

    setCustomerAddress((prev) => [
      ...prev,
      {
        companyName: "",
        telephoneNumber: "",
        mobileNumber: "",
        email: "",
        fax: "",
        panNumber: "",
      },
    ]);
  };

  const removeAddressForm = (index) => {
    if (customerAddress.length <= 1) return;
    const arr = [...customerAddress];
    arr.splice(index, 1);
    setCustomerAddress(arr);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const payload = {
      ...customer,
      customerType: customerTypeIds,
      customerAddress,
    };

    dispatch(createCustomer(payload));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(customerType());
  }, []);
  return (
    <div className=' min-h-screen'>
      <div>
        Component Title
        <h1>Breadcrumbs</h1>
      </div>
      {/*  Customer Details */}
      <form onSubmit={(e) => submitHandler(e)}>
        <div className='bg-white  py-4 my-4 '>
          <div className='grid grid-cols-2 '>
            {test.map((item, index) => {
              return (
                <div className='mx-10 my-3' key={index}>
                  {/* <InputLabel>{item.name}</InputLabel> */}
                  <Input
                    variant='standard'
                    label={item.name}
                    name={item.key}
                    defaultValue={""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              );
            })}
          </div>

          {/*  Customer Type Checkboxes */}
          <div className='mx-10 mt-5'>
            <InputLabel>Customer Type</InputLabel>
            <br />
            {customerTypePayload &&
              customerTypePayload.map((item) => {
                return (
                  <Checkbox
                    className='m-0 p-0'
                    label={item.customerType}
                    key={item._id}
                    value={""}
                    checked={customerTypeIds.includes(item._id)}
                    onChange={(e) => handleCheckboxChange(e, item._id)}
                  />
                );
              })}
          </div>

          {/*  Customer Address */}
          <div className='mx-10 my-5'>
            <InputLabel>Customer Address </InputLabel>
            {customerAddress.map((field, i) => {
              return (
                <div key={i}>
                  <h1>Address : {i + 1}</h1>

                   <div className='grid grid-cols-2 gap-x-5 gap-y-4'>
                    <Input
                      variant='standard'
                      value={customerAddress[i].address}
                      name={"address"}
                      label='Address'
                      onChange={(e) => handleAddress(e, i)}
                    />
                    <Input
                      variant='standard'
                      value={customerAddress[i].city}
                      name={"city"}
                      onChange={(e) => handleAddress(e, i)}
                      label='City'
                    />
                    <Input
                      variant='standard'
                      value={customerAddress[i].state}
                      onChange={(e) => handleAddress(e, i)}
                      name={"state"}
                      label='State'
                    />
                    <Input
                      variant='standard'
                      value={customerAddress[i].country}
                      name={"country"}
                      onChange={(e) => handleAddress(e, i)}
                      label='Country'
                    />
                    <Input
                      variant='standard'
                      value={customerAddress[i].pinCode}
                      name={"pinCode"}
                      onChange={(e) => handleAddress(e, i)}
                      label='Pin Code'
                    />
                    <Input
                      variant='standard'
                      value={customerAddress[i].gstNumber}
                      onChange={(e) => handleAddress(e, i)}
                      name={"gstNumber"}
                      label='GST Number'
                    />
                  </div>
                  <div className='w-full flex items-end justify-end mt-4'>
                    <button
                      disabled={customerAddress.length === 1}
                      onClick={() => removeAddressForm(i)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <div className='w-full flex justify-end'>
              <button onClick={() => addAddressForm()}>Add</button>
            </div>
          </div>
          <div className='mx-10'>
            <Button variant='filled' size='md' type='submit'>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomer;
