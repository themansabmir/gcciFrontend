import React, { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchCustomer } from "../../features/customerSlice";
import { createHbl, hblbyShipment, updateHbl } from "../../features/hblSlice";
import { deepClone } from "../../utils/utility";

// place of receipt
// place of delivery
// port fo loadingport of dischagrge
// vessel
// transhipment port
// exchange rate
// date of SOB
// free time at pol pod both
// gen ref haz
// eta pod
// shipping line name

const SearchField = ({
  // val,
  // hblData,
  // hblindex,
  name,
  address,
  Id,
  AddressId,
  fieldname,
  fieldaddress,
  label,
  handleClick,
  hblIndex,
}) => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer.customerData);

  // const handleClick = (e, customerId, addressId) => {
  //   const { key, val } = e.target.dataset;

  //   const data = [...hblData];
  //   data[hblindex][key] = customerId;
  //   data[hblindex][val] = addressId;
  // };

  const [result, setResult] = useState(name + address);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setResult(name + address);
  }, [name, address]);

  return (
    <div className='w-full'>
      <label> {label} </label>
      <div>
        <textarea
          cols={"30"}
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
                return item.customerAddress.map((elem, index) => {
                  return (
                    <li
                      data-id={Id}
                      data-addressid={AddressId}
                      data-fieldname={fieldname}
                      data-fieldaddress={fieldaddress}
                      className='hover:bg-slate-300 w-full px-5 py-2  cursor-pointer'
                      onClick={(e) => {
                        handleClick(hblIndex, e, item, elem);

                        setResult(`${item.companyName}
${elem.address}${elem.city}${elem.country}
${elem.gstNumber}
${item.email}
${item.mobileNumber}
${item.fax}`);
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

const HBL = ({ props }) => {
  const { shipmentId } = useParams();
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer.customerData);
  const addressData = useSelector((state) => state.address.addressData);
  const portsData = useSelector((state) => state.port.portData);

  const commonFields = useSelector((state) => state?.mbl?.similarFields);
  // const commonData = JSON.parse(localStorage.getItem("mblData"));

  const handleClick = (hblindex, e, item, elem) => {
    const data = [...hblData];
    const { id, addressid, fieldname, fieldaddress } = e.target.dataset;

    data[hblindex][id] = item?._id;
    data[hblindex][addressid] = elem?._id;
    data[hblindex][fieldname] = item?.companyName;
    data[hblindex][
      fieldaddress
    ] = `${elem.address} ${elem.city} ${elem.country} ${elem.gstNumber} ${elem.pinCode}`;

    setHblData(data);
  };

  const {
    receiptPlace,
    deliveryPlace,
    loadingPort,
    dischargePort,
    vessel,
    transhipmentPort,
    exchangeRate,
    SOBdate,
    freePOD,
    freePOL,
    etaPod,
    shiplineName,
    mblNumber,
    voyage,
  } = commonFields || "";
  const initialHBL = {
    shiplineName: shiplineName,
    mblNumber: mblNumber,
    HBLtype: "",
    hblNumber: "",
    hblDate: "",
    receiptPlace: receiptPlace,
    vessel: vessel,
    voyage: voyage,
    tradeType: "",
    freightType: "",
    exchangeRate: exchangeRate,
    transhipmentPort: transhipmentPort,
    SOBdate: SOBdate,
    shippingBillNumber: "",
    shippingBillDate: "",
    billEntryNumber: "",
    billEntryDate: "",
    freePOL: freePOL,
    freePOD: freePOD,
    goodsType: "",
    containerDetails: [
      {
        containerNumber: "",
        containerType: "",
        pkgCount: "",
        pkgType: "",
        grossWeight: "",
        netWeight: "",
        volume: "",
        lineSeal: "",
        shipperSeal: "",
        customsSeal: "",
        description: "",
        hsCode: "",
      },
    ],
    shipperId: "",
    ShipperName: "",
    shipperAddressId: "",
    shipperAddress: "",
    consigneeId: "",
    consigneeName: "",
    consigneeAddressId: "",
    consigneeAddress: "",
    notifyId: "",
    notifyName: "",
    notifyAddressId: "",
    notifyAddress: "",
    agentId: "",
    agentName: "",
    agentAddressId: "",
    agentAddress: "",
    shipmentId: "",
    loadingPort: loadingPort,
    dischargePort: dischargePort,
    deliveryPlace: deliveryPlace,
    etaPod: etaPod,
  };

  const [hblData, setHblData] = useState([initialHBL]);

  // data from mbl form

  const handleChange = (e, hblindex) => {
    e.preventDefault();
    const data = [...hblData];
    const { name, value } = e.target;
    data[hblindex][name] = value;
    setHblData(data);
  };

  const handleContainerChange = (e, hblindex, containerIndex) => {
    e.preventDefault();
    const { name, value } = e.target;
    const data = [...hblData].map((item) => deepClone(item));
    data[hblindex].containerDetails[containerIndex][name] = value;
    setHblData(data);
  };

  const addContainer = (e, hblIndex, containerIndex) => {
    e.preventDefault();
    const data = [...hblData];
    data[hblIndex].containerDetails.push({
      containerNumber: "",
      containerType: "",
      lineSeal: "",
      shipperSeal: "",
      customsSeal: "",
      pkgCount: "",
      pkgType: "",
      grossWeight: "",
      netWeight: "",
      volume: "",
      description: "",
    });
    setHblData(data);
  };

  const newHblForm = () => {
    setHblData((prev) => [...prev, initialHBL]);
  };

  // console.log(hblData.length)

  const submitHandler = () => {
    hblData.forEach((singleHbl) => {
      const data = { ...singleHbl, shipmentId };

      if (data?._id) {
        dispatch(updateHbl(data));
        // console.log("run update function")
      } else {
        dispatch(createHbl(data));
      }
      // console.log(singleHbl)
    });

    // dispatch(createHBL())
  };

  useEffect(() => {
    dispatch(hblbyShipment({ shipmentId: shipmentId })).then(({ payload }) => {
      if (payload.length > 0) {
        const arr = payload.map((item, i) =>
          Object.assign({ ...commonFields }, item)
        );
        setHblData(arr);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    let total20gp = 0;
    hblData.forEach((hblform) => {
      const { containerDetails } = hblform;
      containerDetails.forEach((container) => {
        if (container.containerType === "20GP") {
          total20gp++;
        }
      });
    });
    // console.log(total20gp);
  }, []);

  console.log(hblData);
  return (
    <div className='w-full min-h-screen mx-auto px-10 bg-gray-300'>
      {hblData.map((hblForm, hblindex) => {
        const {
          receiptPlace,
          deliveryPlace,
          loadingPort,
          dischargePort,
          vessel,
          transhipmentPort,
          exchangeRate,
          SOBdate,
          freePOD,
          shipperId,
          ShipperName,
          shipperAddress,
          shipperAddressId,
          consigneeName,
          consigneeAddress,
          consigneeAddressId,
          consigneeId,
          agentAddress,
          agentAddressId,
          agentId,
          agentName,
          notifyAddress,
          notifyAddressId,
          notifyId,
          notifyName,
          freePOL,
          etaPod,
          shiplineName,
          containerDetails,
        } = hblForm;

        return (
          <div>
            <h1 className='text-2xl uppercase font-bold'>
              HBL Form {hblindex + 1}
            </h1>
            <div className='grid grid-cols-4 gap-5 pt-8'>
              {/*first column shipper consingee fields  */}
              <div className='col-span-1'>
                <SearchField
                  hblIndex={hblindex}
                  fieldname={"shipperName"}
                  fieldaddress={"shipperAddress"}
                  name={ShipperName}
                  address={shipperAddress}
                  Id={"shipperId"}
                  AddressId={"shipperAddressId"}
                  label={"Shipper"}
                  handleClick={handleClick}
                />
                <SearchField
                  hblIndex={hblindex}
                  fieldname={"consigneeName"}
                  fieldaddress={"consigneeAddress"}
                  name={consigneeName}
                  address={consigneeAddress}
                  Id={"consigneeId"}
                  AddressId={"consigneeAddressId"}
                  handleClick={handleClick}
                  label={"Consignee"}
                />
                <SearchField
                  hblIndex={hblindex}
                  fieldname={"notifyName"}
                  fieldaddress={"notifyAddress"}
                  name={notifyName}
                  address={notifyAddress}
                  Id={"notifyId"}
                  AddressId={"notifyAddressId"}
                  handleClick={handleClick}
                  label={"Notify"}
                />
              </div>

              {/* 2nd column shipping line delivery address fields  */}
              <div className='col-span-1'>
                <div className='flex flex-col'>
                  <label
                    htmlFor=''
                    className='text-sm font-medium leading-6 text-gray-900'
                  >
                    Shipping Line Name
                  </label>
                  <input
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[0.5px] px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    type='text'
                    placeholder='shipping line name'
                    name='shiplineName'
                    value={shiplineName}
                    onChange={(e) => handleChange(e, hblindex)}
                  />

                  <div>
                    <SearchField
                      hblIndex={hblindex}
                      fieldname={"agentName"}
                      fieldaddress={"agentAddress"}
                      name={agentName}
                      address={agentAddress}
                      Id={"agentId"}
                      AddressId={"agentAddressId"}
                      handleClick={handleClick}
                      label={"Agent"}
                    />
                  </div>
                </div>
              </div>

              {/* thrid column */}
              <div className='mr-4 col-span-2'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900 '
                    >
                      HBL Number
                    </label>
                    <input
                      type='text'
                      name='hblNumber'
                      value={hblData[hblindex].hblNumber}
                      id=''
                      onChange={(e) => handleChange(e, hblindex)}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      HBL Date
                    </label>
                    <input
                      type='text'
                      name='hblDate'
                      value={hblData[hblindex].hblDate}
                      id=''
                      onChange={(e) => handleChange(e, hblindex)}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Place of Receipt
                    </label>
                    <input type='text' name='' id='' value={receiptPlace} />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Place of Delivery
                    </label>
                    <input type='text' name='' id='' value={deliveryPlace} />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Port Of Loading
                    </label>

                    <select
                      className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                      value={loadingPort}
                      defaultValue={loadingPort}
                      onChange={() => {}}
                      // disabled={disableEdit}
                      // onChange={(e) => handleShipmentChange(0, e)}
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
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Port Of Discharge
                    </label>
                    <select
                      className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                      value={dischargePort}
                      defaultValue={dischargePort}
                      onChange={() => {}}
                      // disabled={disableEdit}
                      // onChange={(e) => handleShipmentChange(0, e)}
                      name='dischargePort'
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
                </div>{" "}
                <div className='grid grid-cols-3 gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Vessel
                    </label>
                    <input
                      type='text'
                      name=''
                      id=''
                      value={vessel}
                      defaultValue={vessel}
                      onChange={() => {}}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      {" "}
                      Voyage Number
                    </label>
                    <input
                      type='text'
                      value={voyage}
                      defaultValue={voyage}
                      onChange={() => {}}
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Transhipment Port
                    </label>
                    <input
                      type='text'
                      name=''
                      id=''
                      onChange={() => {}}
                      value={transhipmentPort}
                    />
                  </div>
                </div>{" "}
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Incoterms
                    </label>
                    <select
                      className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                      // disabled={disableEdit}
                      // onChange={(e) => handleShipmentChange(0, e)}
                      value={hblData[hblindex].tradeType}
                      onChange={(e) => handleChange(e, hblindex)}
                      name='tradeType'
                      id=''
                    >
                      <option value=''>Select an option</option>
                      <option value='FOB'>FOB</option>
                      <option value='EXW'>EXW</option>
                      <option value='CIF'>CIF</option>
                      <option value='FCA'>FCA</option>
                    </select>
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Freight Type
                    </label>
                    <select
                      className='block bg-white px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                      value={hblData[hblindex].freightType}
                      // disabled={disableEdit}
                      onChange={(e) => handleChange(e, hblindex)}
                      name='freightType'
                      id=''
                    >
                      <option value=''>Select an option</option>
                      <option value='prepaid'>Prepaid</option>
                      <option value='collect'>Collect</option>
                    </select>
                  </div>
                </div>{" "}
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Exchange Rate
                    </label>
                    <input
                      type='text'
                      name=''
                      id=''
                      value={exchangeRate}
                      onChange={() => {}}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Date of SOB
                    </label>
                    <input
                      type='text'
                      name='SOBdate'
                      id=''
                      value={SOBdate}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Shipping Bill Number
                    </label>
                    <input
                      type='text'
                      name='shippingBillNumber'
                      value={hblData[hblindex].shippingBillNumber}
                      onChange={(e) => handleChange(e, hblindex)}
                      id=''
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Shipping Bill Date
                    </label>
                    <input
                      type='text'
                      name='shippingBillDate'
                      id=''
                      value={hblData[hblindex].shippingBillDate}
                      onChange={(e) => handleChange(e, hblindex)}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Bill Of Entry No.
                    </label>
                    <input
                      type='text'
                      name='billEntryNumber'
                      id=''
                      value={hblData[hblindex].billEntryNumber}
                      onChange={(e) => handleChange(e, hblindex)}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Bill Of Entry Date
                    </label>
                    <input
                      type='text'
                      name='billEntryDate'
                      id=''
                      value={hblData[hblindex].billEntryDate}
                      onChange={(e) => handleChange(e, hblindex)}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Free Time at POL
                    </label>
                    <input
                      type='text'
                      name=''
                      id=''
                      value={freePOL}
                      onChange={() => {}}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Free Time at POD
                    </label>
                    <input
                      type='text'
                      name=''
                      id=''
                      value={freePOD}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      GEN/REF/HAZ
                    </label>
                    <select
                      name='goodsType'
                      value={hblData[hblindex].goodsType}
                      id=''
                      onChange={(e) => {
                        handleChange(e, hblindex);
                      }}
                    >
                      <option value=''>select an option </option>
                      <option value='general'>General</option>
                      <option value='reefer'>Reefer</option>
                      <option value='hazard'>Hazard</option>
                    </select>
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      ETA POD
                    </label>
                    <input
                      type='text'
                      name=''
                      id=''
                      value={etaPod}
                      className='bg-gray-300 py-2  border-2'
                    />
                  </div>
                </div>
              </div>

              <div className='col-span-3'>
                {/* <h1 className='uppercase text-3xl font-semibold '>
                  Container Details
                </h1> */}
                <div>
                  {containerDetails.map((container, containerIndex) => {
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
                    } = container;
                    return (
                      <div className=' grid grid-cols-3  gap-x-10 pb-4 my-8'>
                        <h1 className='col-span-3 text-3xl uppercase pt-3'>
                          Container Details {containerIndex + 1}
                        </h1>
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
                              // disabled={disableEdit}
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
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
                              // disabled={disableEdit}
                              // onChange={(e) => handleContainerChange(0, index, e)}
                              name='containerType'
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
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
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
                              type='text'
                              name='marksNumbers'
                              // disabled={disableEdit}
                              // onChange={(e) => handleContainerChange(0, index, e)}
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
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
                              type='text'
                              name='lineSeal'
                              // disabled={disableEdit}
                              // onChange={(e) => handleContainerChange(0, index, e)}
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
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
                              // disabled={disableEdit}
                              // onChange={(e) => handleContainerChange(0, index, e)}
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
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
                              // disabled={disableEdit}
                              // onChange={(e) => handleContainerChange(0, index, e)}
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
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
                              // disabled={disableEdit}
                              // onChange={(e) => handleContainerChange(0, index, e)}
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
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
                              // disabled={disableEdit}
                              // onChange={(e) => handleContainerChange(0, index, e)}
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
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
                              // disabled={disableEdit}
                              // onChange={(e) => handleContainerChange(0, index, e)}
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
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
                              // disabled={disableEdit}
                              // onChange={(e) => handleContainerChange(0, index, e)}
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
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
                              // disabled={disableEdit}
                              // onChange={(e) => handleContainerChange(0, index, e)}
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
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
                              // disabled={disableEdit}
                              // onChange={(e) => handleContainerChange(0, index, e)}
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
                              onChange={(e) =>
                                handleContainerChange(
                                  e,
                                  hblindex,
                                  containerIndex
                                )
                              }
                              // disabled={disableEdit}
                              // onChange={(e) => handleContainerChange(0, index, e)}
                              type='text'
                              name='volume'
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className='flex justify-end'>
                    <button
                      onClick={(e) => addContainer(e, hblindex)}
                      className='float-right text-4xl text-red-600 font-semibold  mb-5 relative bottom-7    '
                    >
                      <AiFillPlusCircle />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='pb-8'>
              <button
                onClick={() => newHblForm()}
                className='bg-green-500 font-semibold text-white px-2 py-1 '
              >
                {" "}
                New HBL
              </button>
            </div>

            <div>
              <div>
                <label htmlFor=''>Total 20GP Containers</label>
              </div>
            </div>
          </div>
        );
      })}

      <div className='flex gap-8'>
        <button
          onClick={() => submitHandler()}
          className='bg-green-500 font-semibold text-white px-2 py-1'
        >
          Submit
        </button>
        <button className='bg-green-500 font-semibold text-white px-2 py-1 '>
          Save
        </button>
        <button className='bg-red-500 font-semibold text-white px-2 py-1 '>
          Reset
        </button>
      </div>
    </div>
  );
};

export default HBL;
