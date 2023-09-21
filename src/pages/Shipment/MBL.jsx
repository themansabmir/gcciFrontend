import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMBL } from "../../features/mblSlice";
import { searchCustomer } from "../../features/customerSlice";
import { AiFillPlusCircle } from "react-icons/ai";

export const Field = ({ props, name, val, label }) => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer.customerData);


  const { handleClick } = props;

  const [result, setResult] = useState();
  const [open, setOpen] = useState(false);

  return (
    <div className='w-full'>
      <label> {label} </label>
      <div>
        <textarea
          cols={"60"}
          rows='5'
          value={result}
          onChange={(e) => {
            dispatch(searchCustomer(e.target.value));
            setResult(e.target.value);
            setOpen(true);
          }}
        ></textarea>
      </div>
      <div>
        <ul className='relative top-0'>
          <div className='absolute  bg-gray-200 w-full rounded  mt-1'>
            {open &&
              result &&
              customerData.map((item, mainIndex) => {
                console.log(item, mainIndex)
                return item.customerAddress.map((elem, index) => {
                  return (
                    <li
                      data-key={name}
                      data-val={val}
                      className='hover:bg-slate-300 w-full px-5 py-2  cursor-pointer'
                      onClick={(e) => {

                        handleClick(0, index, e, item._id, elem._id);
                        setResult(`${item.companyName}
${elem.address}${elem.city}${elem.country}${elem.gstNumber}${item.email}${item.mobile}${item.fax}`);
                        setOpen(false);
                      }}
                    >{`${item.companyName} - ${elem.city} ${elem.country}`}</li>
                  );
                });
              })}
          </div>
        </ul>
      </div>
    </div>
  );
};

const MBL = ({ props }) => {
  const dispatch = useDispatch();

  // FOR MAIN FORM

  const {
    portsData,

    handleShipmentChange,
    handleContainerChange,
    addContainer,
    shipmentData,

    handleClick,
  } = props;
  //FOR CONTAINER FORM

  const {
    shipmentMedium,
    shipmentType,
    shipmentMode,
    bookingNumber,
    MBLtype,
    shiplineName,
    mblNumber,
    mblDate,
    receiptPlace,
    deliveryPlace,
    vessel,
    voyage,
    tradeType,
    remarks,
    freightType,
    exchangeRate,
    SOBdate,
    etaPOD,
    transhipmentPort,
    shippingBillNumber,
    shippingBillDate,
    billEntryNumber,
    billEntryDate,
    freePOL,
    freePOD,
    loadingPort,
    dischargePort,
  } = shipmentData[0];

  const submit = () => {
    const data = {
      ...shipmentData[0],
    };
    dispatch(createMBL(data));
  };

  const fieldProps = {
    handleClick,
  };

  return (
    <div>
      <div className='mx-5 mb-4'>
        <form action=''>
          {/* shipment modes  */}
          <div className='grid grid-cols-5 gap-12 '>
            <div className='flex flex-col'>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                Shipment Medium{" "}
              </label>
              <select
                name='shipmentMedium'
                value={shipmentMedium}
                onChange={(e) => handleShipmentChange(0, e)}
                id=''
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                <option value=''>Shipment Medium</option>
                <option value='sea'>Sea</option>
                <option value='air'>Air</option>
              </select>
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                Shipment Type
              </label>
              <select
                onChange={(e) => handleShipmentChange(0, e)}
                name='shipmentType'
                id=''
                value={shipmentType}
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                <option value=''>Shipment Type</option>
                <option value='FCL'>FCL</option>
                <option value='LCL'>LCL</option>
              </select>
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                Shipment Mode{" "}
              </label>
              <select
                onChange={(e) => handleShipmentChange(0, e)}
                name='shipmentMode'
                value={shipmentMode}
                id=''
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                <option value=''>Shipment Mode</option>
                <option value='import'>Import</option>
                <option value='export'>Export</option>
              </select>
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                Booking Number{" "}
              </label>
              <input
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                name='bookingNumber'
                value={bookingNumber}
                placeholder='Booking Number'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                MBL Type
              </label>
              <select
                onChange={(e) => handleShipmentChange(0, e)}
                name='MBLtype'
                value={MBLtype}
                id=''
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                <option value=''>MBL Type</option>
                <option value='OBL'>OBL</option>
                <option value='seaway'>Seaway</option>
                <option value='TLX'>TLX</option>
                <option value='surrender'>Surrender</option>
              </select>
            </div>
          </div>

          {/* MBL number date  */}
          <div className='grid grid-cols-3 gap-12 my-6'>
            <div className='flex flex-col'>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                Shipping Line Name
              </label>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                value={shiplineName}
                placeholder='shipping line name'
                name='shiplineName'
              />
            </div>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                MBL Number
              </label>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                value={mblNumber}
                placeholder='MBL Number'
                name='mblNumber'
              />
            </div>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                MBL Date
              </label>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                value={mblDate}
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                placeholder='MBL Date'
                name='mblDate'
              />
            </div>
          </div>

          <div className='flex justify-between '>
            <div className=''>
              <Field
                props={fieldProps}
                name={"shipperName"}
                val={"shipperAddress"}
                label={"Shipper"}
              />
              <Field
                props={fieldProps}
                name={"consigneeName"}
                val={"consigneeAddress"}
                label={"Consignee"}
              />
              <Field
                props={fieldProps}
                name={"notifyName"}
                val={"notifyAddress"}
                label={"Notify"}
              />
            </div>
            <div>
              <Field
                props={fieldProps}
                name={"agentName"}
                val={"agentAddress"}
                label={"Forwarding Agent"}
              />
              <div className='flex flex-col'>
                <label
                  className='text-sm font-medium leading-6 text-gray-900'
                  htmlFor=''
                >
                  place of receipt
                </label>
                <textarea
                  cols={60}
                  rows={2}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  value={receiptPlace}
                  onChange={(e) => handleShipmentChange(0, e)}
                  type='text'
                  placeholder='Place of receipt'
                  name='receiptPlace'
                />
              </div>
              <div className='flex flex-col'>
                <label
                  className='text-sm font-medium leading-6 text-gray-900'
                  htmlFor=''
                >
                  Place of Delivery
                </label>
                <textarea
                  cols={60}
                  rows={2}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  value={deliveryPlace}
                  onChange={(e) => handleShipmentChange(0, e)}
                  type='text'
                  placeholder='Place of receipt'
                  name='deliveryPlace'
                />
              </div>
              <div className='flex flex-col'>
                <label
                  className='text-sm font-medium leading-6 text-gray-900'
                  htmlFor=''
                >
                  Transhipment Port
                </label>
                <textarea
                  cols={60}
                  rows={2}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={(e) => handleShipmentChange(0, e)}
                  type='text'
                  value={transhipmentPort}
                  name='transhipmentPort'
                  placeholder='Transhipment Port'
                  id=''
                />
              </div>
            </div>
          </div>
          {/* shipper consignee addresses  */}
          {/* <div className='grid grid-cols-4 gap-5 my-6'>
            <div className='flex flex-col'>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                MBL Shipper Name
              </label>
              <select
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                name='shipperName'
                value={shipperName}
                id=''
                onChange={(e) => handleShipmentChange(0, e)}
              >
                <option value=''> MBL Shipper Name</option>
                {customerData.map((item) => {
                  return <option value={item._id}>{item.companyName}</option>;
                })}
              </select>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                MBL Shipper Address
              </label>
              <select
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                onChange={(e) => handleShipmentChange(0, e)}
                name='shipperAddress'
                value={shipperAddress}
                id=''
              >
                <option value=''> MBL Shipper address </option>
                {addressData.map((item) => {
                  return (
                    <option
                      value={item._id}
                    >{`${item.city} ${item.country}`}</option>
                  );
                })}
              </select>
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                MBL Consignee Name
              </label>
              <select
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                onChange={(e) => handleShipmentChange(0, e)}
                name='consigneeName'
                value={consigneeName}
                id=''
              >
                <option value=''> MBL Consignee Name</option>
                {customerData.map((item) => {
                  return <option value={item._id}>{item.companyName}</option>;
                })}
              </select>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                MBL Consignee Address
              </label>
              <select
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                onChange={(e) => handleShipmentChange(0, e)}
                name='consigneeAddress'
                value={consigneeAddress}
                id=''
              >
                <option value=''> MBL Consignee address </option>
                {addressData.map((item) => {
                  return (
                    <option
                      value={item._id}
                    >{`${item.city} ${item.country}`}</option>
                  );
                })}
              </select>
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                MBL Notify Party Name
              </label>
              <select
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                onChange={(e) => handleShipmentChange(0, e)}
                name='notifyName'
                value={notifyName}
                id=''
              >
                <option value=''> MBL Notify party Name</option>
                {customerData.map((item) => {
                  return <option value={item._id}>{item.companyName}</option>;
                })}
              </select>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                MBL Notify Party Address
              </label>
              <select
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                onChange={(e) => handleShipmentChange(0, e)}
                name='notifyAddress'
                value={notifyAddress}
                id=''
              >
                <option value=''> MBL Notify Party Address </option>
                {addressData.map((item) => {
                  return (
                    <option
                      value={item._id}
                    >{`${item.city} ${item.country}`}</option>
                  );
                })}
              </select>
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                MBL Agent Name
              </label>
              <select
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                name='agentName'
                onChange={(e) => handleShipmentChange(0, e)}
                value={agentName}
                id=''
              >
                <option value=''> MBL Agent Name</option>
                {customerData.map((item) => {
                  return <option value={item._id}>{item.companyName}</option>;
                })}
              </select>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900'
              >
                MBL Agent Address
              </label>
              <select
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                onChange={(e) => handleShipmentChange(0, e)}
                name='agentAddress'
                value={agentAddress}
                id=''
              >
                <option value=''> MBL Agent address </option>
                {addressData.map((item) => {
                  return (
                    <option
                      value={item._id}
                    >{`${item.city} ${item.country}`}</option>
                  );
                })}
              </select>
            </div>
          </div> */}

          {/* Port load discharge etc */}
          <div className='grid grid-cols-3 gap-5 my-6'>
            <div>
              <div className='flex flex-col'>
                <label
                  className='text-sm font-medium leading-6 text-gray-900'
                  htmlFor=''
                >
                  Port of loading
                </label>
                <select
                  className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  value={loadingPort}
                  onChange={(e) => handleShipmentChange(0, e)}
                  name='loadingPort'
                  id=''
                >
                  <option value=''>Select Port</option>
                  {portsData.map((item, index) => {
                    return (
                      <option value={item._id}>
                        {item.portName + " " + item.portCode}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='flex flex-col'>
                <label
                  className='text-sm font-medium leading-6 text-gray-900'
                  htmlFor=''
                >
                  Port of Discharge
                </label>
                <select
                  className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  onChange={(e) => handleShipmentChange(0, e)}
                  name='dischargePort'
                  value={dischargePort}
                  id=''
                >
                  <option value=''>Select Port</option>
                  {portsData.map((item, index) => {
                    return (
                      <option value={item._id}>
                        {item.portName + " " + item.portCode}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <div className='flex flex-col'>
                <label
                  className='text-sm font-medium leading-6 text-gray-900'
                  htmlFor=''
                >
                  Vessel
                </label>
                <input
                  type='text'
                  onChange={(e) => handleShipmentChange(0, e)}
                  name='vessel'
                  placeholder='Vessel'
                  value={vessel}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                <label
                  className='text-sm font-medium leading-6 text-gray-900'
                  htmlFor=''
                >
                  Voyage Number
                </label>
                <input
                  type='text'
                  onChange={(e) => handleShipmentChange(0, e)}
                  name='voyage'
                  value={voyage}
                  placeholder='Voyage Number'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                {" "}
                Delivery Type
              </label>
              <select
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                onChange={(e) => handleShipmentChange(0, e)}
                value={tradeType}
                name='tradeType'
                id=''
              >
                <option value=''>Select an option</option>
                <option value='FOB'>FOB</option>
                <option value='EXW'>EXW</option>
                <option value='CIF'>CIF</option>
                <option value='FCA'>FCA</option>
              </select>

              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                {" "}
                Freight Type
              </label>
              <select
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                value={freightType}
                onChange={(e) => handleShipmentChange(0, e)}
                name='freightType'
                id=''
              >
                <option value=''>Select an option</option>
                <option value='prepaid'>Prepaid</option>
                <option value='collect'>Collect</option>
              </select>
            </div>
          </div>
          {/* vessel type  */}

          {/* <div className='grid grid-cols-3 gap-8 my-6'>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                {" "}
                Freight Type
              </label>
              <select
                className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                value={freightType}
                onChange={(e) => handleShipmentChange(0, e)}
                name='freightType'
                id=''
              >
                <option value=''>Select an option</option>
                <option value='prepaid'>Prepaid</option>
                <option value='collect'>Collect</option>
              </select>
            </div>
          </div> */}
          {/* shiping bill number & dates  */}
          <div className='grid grid-cols-3 gap-6 my-6'>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                Shipping Bill No.
              </label>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                value={shippingBillNumber}
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                placeholder='Shipping Bill Number'
                name='shippingBillNumber'
              />
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                Shipping Bill Date
              </label>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                value={shippingBillDate}
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                placeholder='Shipping Bill Date'
                name='shippingBillDate'
              />
            </div>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                Bill of entry No.
              </label>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                value={billEntryNumber}
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                placeholder='Shipping Bill Number'
                name='billEntryNumber'
              />
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                Bill of entry Date
              </label>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                value={billEntryDate}
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                placeholder='Shipping Bill Date'
                name='billEntryDate'
              />
            </div>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                Free time at POL.
              </label>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                value={freePOL}
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                placeholder='Shipping Bill Number'
                name='freePOL'
              />
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                free time at POD
              </label>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                value={freePOD}
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                placeholder='Shipping Bill Date'
                name='freePOD'
              />
            </div>
          </div>

          {/* eta pod ats of SOB  */}

          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                {" "}
                Exchange Rate
              </label>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                value={exchangeRate}
                placeholder='exchange rate'
                name='exchangeRate'
              />
            </div>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                {" "}
                Date Of SOB
              </label>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                value={SOBdate}
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                placeholder='exchange rate'
                name='SOBdate'
              />
            </div>
            <div className='flex flex-col'>
              <label
                className='text-sm font-medium leading-6 text-gray-900'
                htmlFor=''
              >
                {" "}
                ETA POD
              </label>
              <input
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) => handleShipmentChange(0, e)}
                type='text'
                value={etaPOD}
                placeholder='exchange rate'
                name='etaPOD'
              />
            </div>
          </div>

          <div className='my-12 flex flex-col gap-10'>
            <h1 className='text-4xl'>Container Details:</h1>
            {shipmentData[0].containerDetails.map((item, index) => {
              const {
                containerNumber,
                containerType,
                lineSeal,
                shipperSeal,
                customsSeal,
                pkgCount,
                pkgType,
                grossWeight,
                netWeight,
                volume,
                description,
                hsCode,
                marksNumbers,
              } = item;

              return (
                <div className='grid grid-cols-3 gap-5'>
                  <div className=''>
                    <div className='flex flex-col'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        Container Number
                      </label>
                      <input
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={containerNumber}
                        onChange={(e) => handleContainerChange(0, index, e)}
                        type='text'
                        name='containerNumber'
                      />
                    </div>
                    <div className='flex flex-col w-full'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        Container Type
                      </label>
                      <select
                        className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                        value={containerType}
                        onChange={(e) => handleContainerChange(0, index, e)}
                        name='containerType'
                        id=''
                      >
                        <option value=''>Select Option</option>
                        <option value='20GP'>20GP</option>
                        <option value='40HQ'>40HQ</option>
                      </select>
                    </div>
                    <div className='flex flex-col'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        Marks and No.s
                      </label>
                      <input
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={marksNumbers}
                        type='text'
                        name='marksNumbers'
                        onChange={(e) => handleContainerChange(0, index, e)}
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        Line Seal
                      </label>
                      <input
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={lineSeal}
                        type='text'
                        name='lineSeal'
                        onChange={(e) => handleContainerChange(0, index, e)}
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        Shipper Seal
                      </label>
                      <input
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={shipperSeal}
                        onChange={(e) => handleContainerChange(0, index, e)}
                        type='text'
                        name='shipperSeal'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        Customs Seal
                      </label>
                      <input
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={customsSeal}
                        onChange={(e) => handleContainerChange(0, index, e)}
                        type='text'
                        name='customsSeal'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        HS Code
                      </label>
                      <input
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={hsCode}
                        onChange={(e) => handleContainerChange(0, index, e)}
                        type='text'
                        name='hsCode'
                      />
                    </div>
                  </div>

                  <div className=''>
                    <div className='flex flex-col'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        Number Of Package
                      </label>
                      <input
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={pkgCount}
                        onChange={(e) => handleContainerChange(0, index, e)}
                        type='text'
                        name='pkgCount'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        Package Type
                      </label>
                      <input
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={pkgType}
                        onChange={(e) => handleContainerChange(0, index, e)}
                        type='text'
                        name='pkgType'
                      />
                    </div>

                    <div className='flex flex-col'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        Description
                      </label>
                      <textarea
                        rows={10}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={description}
                        onChange={(e) => handleContainerChange(0, index, e)}
                        type='text'
                        name='description'
                      />
                    </div>
                  </div>
                  <div className=''>
                    <div className='flex flex-col'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        Gross Weight
                      </label>
                      <input
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={grossWeight}
                        onChange={(e) => handleContainerChange(0, index, e)}
                        type='text'
                        name='grossWeight'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        Net weight
                      </label>
                      <input
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={netWeight}
                        onChange={(e) => handleContainerChange(0, index, e)}
                        type='text'
                        name='netWeight'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label
                        className='text-sm font-medium leading-6 text-gray-900'
                        htmlFor=''
                      >
                        Volume
                      </label>
                      <input
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={volume}
                        onChange={(e) => handleContainerChange(0, index, e)}
                        type='text'
                        name='volume'
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            type='button'
            className='float-right text-4xl text-red-600 font-semibold  mb-5 relative bottom-7    '
            onClick={(e) => addContainer(0, e)}
          >
            <AiFillPlusCircle />
          </button>
          <div className='flex flex-col mb-2'>
            <label htmlFor=''>Remarks:</label>
            <textarea
              id=''
              cols='30'
              rows='4'
              value={remarks}
              onChange={(e) => handleShipmentChange(0, e)}
              name='remarks'
            ></textarea>
          </div>
        </form>

        <button
          className='bg-primary text-white font-semibold px-4 py-2 rounded-md '
          onClick={submit}
        >
          Submit{" "}
        </button>
      </div>

      <div></div>
    </div>
  );
};

export default MBL;
