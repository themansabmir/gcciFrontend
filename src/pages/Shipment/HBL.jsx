import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCustomer } from "../../features/customerSlice";

const initialHBL = {
  shipmentMedium: "",
  shipmentType: "",
  shipmentMode: "",
  bookingNumber: "",
  MBLtype: "",
  shiplineName: "",
  mblNumber: "",
  mblDate: "",
  receiptPlace: "",
  deliveryPlace: "",
  vessel: "",
  tradeType: "",
  freightType: "",
  exchangeRate: "",
  SOBdate: "",
  etaPOD: "",
  transhipmentPort: "",
  shippingBillNumber: "",
  shippingBillDate: "",
  billEntryNumber: "",
  billEntryDate: "",
  freePOL: "",
  freePOD: "",
  shipperName: "",
  shipperAddress: "",
  consigneeName: "",
  consigneeAddress: "",
  notifyName: "",
  notifyAddress: "",
  agentName: "",
  agentAddress: "",
  loadingPort: "",
  dischargePort: "",
  containerDetails: [
    {
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
      hsCode: "",
    },
  ],
};

const SearchField = ({ label, name, val }) => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer.customerData);

  const [result, setResult] = useState();
  const [open, setOpen] = useState(false);

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
                console.log(item, mainIndex);
                return item.customerAddress.map((elem, index) => {
                  return (
                    <li
                      data-key={name}
                      data-val={val}
                      className='hover:bg-slate-300 w-full px-5 py-2  cursor-pointer'
                      onClick={(e) => {
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

const HBL = ({ props }) => {
  const [hblData, setHblData] = useState([initialHBL]);

  const newHblForm = () => {
    setHblData((prev) => [...prev, initialHBL]);
  };

  return (
    <div className='w-full min-h-screen bg-green-400'>
      {hblData.map((hblForm, index) => {
        return (
          <div>
            <div className='grid grid-cols-3 gap-5'>
              {/* shipper consingee fields  */}
              <div>
                <SearchField
                  name={"shipperName"}
                  val={"shipperAddress"}
                  label={"Shipper"}
                />
                <SearchField
                  name={"consigneeName"}
                  val={"consigneeAddress"}
                  label={"Consignee"}
                />
                <SearchField
                  name={"notifyName"}
                  val={"notifyAddress"}
                  label={"Notify"}
                />
              </div>

              {/* shipping line delivery address fields  */}
              <div>
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
                  />

                  <div>
                    <SearchField
                      name={"agentName"}
                      val={"agentAddress"}
                      label={"Agent"}
                    />
                  </div>
                </div>
              </div>

              {/* thrid column */}
              <div className='mr-4'>
                <div className='flex gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      HBL Number
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      HBL Date
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Place of Receipt
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Place of Delivery
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Port Of Loading
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Port Of Discharge
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                </div>{" "}
                <div className='flex gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Vessel /Voyage
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Transhipment Port
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                </div>{" "}
                <div className='flex gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Delivery Type
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Freight Type
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                </div>{" "}
                <div className='flex gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Exchange Rate
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Date of SOB
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Shipping Bill Number
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Shipping Bill Date
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Bill Of Entry No.
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Bill Of Entry Date
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Free Time at POL
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      Free Time at POD
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      GEN/REF/HAZ
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-sm font-medium leading-6 text-gray-900'
                    >
                      ETA POD
                    </label>
                    <input type='text' name='hblNumber' id='' />
                  </div>
                </div>
              </div>
            </div>

            <button onClick={()=> newHblForm()}> Add</button>
          </div>
        );
      })}
    </div>
  );
};

export default HBL;
