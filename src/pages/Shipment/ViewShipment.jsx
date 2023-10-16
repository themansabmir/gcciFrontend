import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getMBLbyid, singleMBL } from "../../features/mblSlice";
export const ViewMBL = () => {
  const mblData = useSelector(singleMBL);

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
    vessel,
    voyage,
    tradeType,
    freightType,
    exchangeRate,
    SOBdate,
    shippingBillNumber,
    shippingBillDate,
    billEntryNumber,
    billEntryDate,
    freePOL,
    freePOD,
    remarks,
    containerDetails,
    shipperName,
    shipperAddress,
    consigneeName,
    consigneeAddress,
    notifyName,
    notifyAddress,
    agentName,
    agentAddress,
    loadingPort,
    dischargePort,
    deliveryPlace,
  } = mblData || "";

  return (
    <>
      {mblData && (
        <div className='grid grid-cols-3 mx-1'>
          <div>
            <div className='flex flex-col bg-gray-200  px-3 py-1  my-2 text-sm'>
              <label htmlFor='' className='text-gray-600 '>
                Shipper Name :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {shipperName.companyName}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                Email :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {shipperName.email}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                Mobile :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {shipperName.mobileNumber}{" "}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                PAN Number :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {shipperName.panNumber}{" "}
                </span>{" "}
              </label>

              <label htmlFor='' className='text-gray-600 '>
                State :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {shipperAddress.state}{" "}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                Country :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {shipperAddress.country}{" "}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                GST Number :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {shipperAddress.gstNumber}{" "}
                </span>{" "}
              </label>
            </div>
            <div className='flex flex-col bg-gray-200 px-3 py-1 text-sm '>
              <label htmlFor='' className='text-gray-600 '>
                Consignee Name :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {consigneeName.companyName}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                Email :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {consigneeName.email}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                Mobile :{" "}
                <span className='text-gray-900 font-bold'>
                  {consigneeName.mobileNumber}{" "}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                PAN Number :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {consigneeName.panNumber}{" "}
                </span>{" "}
              </label>

              <label htmlFor='' className='text-gray-600 '>
                State :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {consigneeAddress.state}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                Country :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {consigneeAddress.country}{" "}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                GST Number :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {consigneeAddress.gstNumber}
                </span>{" "}
              </label>
            </div>
            <div className='flex flex-col bg-gray-200 px-3 py-1 my-2 text-sm'>
              <label htmlFor='' className='text-gray-600 '>
                Notify Name :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {notifyName.companyName}{" "}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                Email :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {notifyName.email}{" "}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                Mobile :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {notifyName.mobileNumber}{" "}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                PAN Number :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {notifyName.panNumber}{" "}
                </span>{" "}
              </label>

              <label htmlFor='' className='text-gray-600 '>
                State :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {notifyAddress.state}{" "}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                Country :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {notifyAddress.country}{" "}
                </span>{" "}
              </label>
              <label htmlFor='' className='text-gray-600 '>
                GST Number :{" "}
                <span className='text-gray-900 font-bold'>
                  {" "}
                  {notifyAddress.gstNumber}
                </span>{" "}
              </label>
            </div>
            <div className='grid grid-cols-2 bg-gray-200 text-sm'>
              <label htmlFor=''>
                Port of Loading <br /> <span> {loadingPort.portName}</span>
              </label>
              <label htmlFor=''>
                Port of Discharge <br />
                <span>{dischargePort.portName}</span>
              </label>
            </div>
            <div className='grid grid-cols-2  my-2 bg-gray-200 text-sm'>
              <label htmlFor=''>
                Ocean Vessel/Voyage <br />{" "}
                <span>
                  {" "}
                  {vessel} / {voyage}
                </span>
              </label>
              <label htmlFor=''>
                Place of Delivery <br />
                <span>{deliveryPlace.toUpperCase()}</span>
              </label>
            </div>
          </div>
          <div className='col-span-2'>
            <div className='grid grid-cols-2 bg-gray-200 ml-5 px-2 py-1 mb-4'>
              <p>Shipping Line: {shiplineName}</p>
              <p>Shipment Mode:{shipmentMode}</p>
              <p>Shipping Bill Number:{shippingBillNumber}</p>
              <p>Shipping Bill Date: {shippingBillDate}</p>
              <p>SOB Date{SOBdate}</p>
              <p>Booking Number:{bookingNumber}</p>
            </div>
            <div>
              {containerDetails.map((container, i) => {
                console.log(container);
                const {
                  containerNumber,
                  containerType,
                  description,
                  hsCode,
                  customsSeal,
                  pkgCount,
                  pkgType,
                  volume,
                  shipperSeal,
                  lineSeal,
                  grossWeight,
                } = container;
                return (
                  <div className='bg-gray-200 mb-5 ml-5 px-3 py-2  '>
                    <div className='flex gap-4'>
                      <p>
                        Container Number:{" "}
                        <span className='font-semibold text-black text-base'>
                          {}
                          {containerNumber}
                        </span>{" "}
                      </p>
                      <p className='font-semibold text-black text-base'>
                        {" "}
                        | {containerType}
                      </p>
                    </div>
                    <div className='grid grid-cols-3 gap-4 mb-2'>
                      <p>
                        Pkg Type:{" "}
                        <span className='font-semibold text-black text-base'>
                          {}
                          {pkgType}
                        </span>{" "}
                      </p>
                      <p>
                        Pkg Count:{" "}
                        <span className='font-semibold text-black text-base'>
                          {}
                          {pkgCount}
                        </span>{" "}
                      </p>
                      <p>
                        HS Code:{" "}
                        <span className='font-semibold text-black text-base'>
                          {}
                          {hsCode}
                        </span>{" "}
                      </p>
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                      <p>
                        Line Seal:{" "}
                        <span className='font-semibold text-black text-base'>
                          {}
                          {lineSeal}
                        </span>{" "}
                      </p>
                      <p>
                        Custom Seal:{" "}
                        <span className='font-semibold text-black text-base'>
                          {}
                          {customsSeal}
                        </span>{" "}
                      </p>
                      <p>
                        Shipper Seal:{" "}
                        <span className='font-semibold text-black text-base'>
                          {}
                          {shipperSeal}
                        </span>{" "}
                      </p>
                    </div>
                    <div className='grid grid-cols-3 gap-4 mt-2'>
                      <p>
                        Volume:{" "}
                        <span className='font-semibold text-black text-base'>
                          {}
                          {volume}
                        </span>{" "}
                      </p>
                      <p>
                        Gross Weight:{" "}
                        <span className='font-semibold text-black text-base'>
                          {}
                          {grossWeight}
                        </span>{" "}
                      </p>
                    </div>
                    <div className='w-full  break-all '>
                      <p className=''>
                        Description:{" "}
                        <h1 className='font-semibold text-black text-base  '>
                          {}

                          {description}
                        </h1>{" "}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export const ViewHBL = () => {};

export const ViewSales = () => {};

export const ViewPurchase = () => {};

export const ViewAttachments = () => {};
export const ViewLogs = () => {};

const ViewShipment = () => {
  const { mblId } = useParams();
  console.log(mblId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMBLbyid({ mblId: mblId }));
  });

  const [tabs, setTabs] = useState(0);
  const tabsData = [
    {
      name: "MBL",
      content: <ViewMBL />,
    },
    {
      name: "HBL",
      content: <ViewHBL />,
    },
    {
      name: "Sales",
      content: <ViewHBL />,
    },
    {
      name: "Purchase",
      content: <ViewHBL />,
    },
    {
      name: "Attachments",
      content: <ViewAttachments />,
    },
    {
      name: "Logs",
      content: <ViewLogs />,
    },
  ];

  return (
    <div>
      <div className='flex'>
        {tabsData.map((tab, index) => {
          return (
            <li
              className={`cursor-pointer list-none my-2 px-8 py-2 text-xl ml-5  ${
                tabs === index ? `bg-primary  text-white  shadow-md ` : ""
              } `}
              key={index}
              onClick={() => setTabs(index)}
            >
              {tab.name}
            </li>
          );
        })}
      </div>

      <div>{tabsData[tabs].content}</div>
    </div>
  );
};

export default ViewShipment;
