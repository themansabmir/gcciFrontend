import React, { useEffect, useState } from "react";
import MBL from "./MBL";
import HBL from "./HBL";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "../../features/customerSlice";
import { getAddress } from "../../features/addressSlice";
import { getPorts } from "../../features/portSlice";

const CreateShipment = () => {
  const dispatch = useDispatch();
  const [tabs, setTabs] = useState(0);

  const [search, setSearch] = useState("");

  const customerData = useSelector((state) => state.customer.customerData);
  const addressData = useSelector((state) => state.address.addressData);
  const portsData = useSelector((state) => state.port.portData);

  const [shipmentData, setShipmentData] = useState([
    {
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
    },
  ]);

  // tohandle inout values of main shpment form
  const handleShipmentChange = (index, e) => {
    e.preventDefault();
    const data = [...shipmentData];
    const { name, value } = e.target;
    data[index][name] = value;
    setShipmentData(data);
  };

  const handleClick = (mainIndex, index, e, item, elem) => {
    const { key, val } = e.target.dataset;

    let data = [...shipmentData];


    data[mainIndex][key] = item;
    data[mainIndex][val] = elem;

    setShipmentData(data);

    // const data = [...shipmentData];
    // data[0][e.target.name] = e.target.value;
  };
  // container input  handler
  const handleContainerChange = (mainIndex, index, e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const data = [...shipmentData];
    data[mainIndex].containerDetails[index][name] = value;
    setShipmentData(data);
  };

  // add more ontainer fields

  const addContainer = (index, e) => {
    e.preventDefault();
    const data = [...shipmentData];
    data[index].containerDetails.push({
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
    setShipmentData(data);
  };

  const props = {
    customerData,
    addressData,
    portsData,
    handleShipmentChange,
    handleContainerChange,
    addContainer,
    shipmentData,
    setShipmentData,
    handleClick,
    search,
    setSearch,
  };

  const tabsData = [
    {
      label: "MBL",
      content: <MBL props={props} />,
    },
    {
      label: "HBL",
      content: <HBL props={props} />,
    },
  ];

  useEffect(() => {
    dispatch(getCustomer());
    dispatch(getAddress());
    dispatch(getPorts());
  }, [dispatch]);
  return (
    <div className='flex flex-col'>
      <div className='flex  sticky top-0 border-b-2 border-b-black  mb-3 bg-white  '>
        {tabsData.map((item, index) => (
          <li
            className={`cursor-pointer list-none my-2 px-8 py-2 text-xl ml-5  ${
              tabs === index
                ? `bg-primary  text-white  shadow-md shadow-gray-600 rounded`
                : ""
            } `}
            key={index}
            onClick={() => setTabs(index)}
          >
            {item.label}
          </li>
        ))}
      </div>
      <div>{tabsData[tabs].content}</div>
    </div>
  );
};

export default CreateShipment;
