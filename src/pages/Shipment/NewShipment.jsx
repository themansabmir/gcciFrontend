import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createShipment } from "../../features/shipmentSlice";

const NewShipment = () => {
  const [shipment, setShipment] = useState({
    shipmentType: "",
    shipmentNumber: "",
    shiplineName: "",
    deliveryPlace: "",
    etaPod: "",
    referenceNumber: "",
    SOBdate:""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    const data = { ...shipment };

    console.log(name, value);

    data[name] = value;
    setShipment(data);
  };
  console.log(shipment)

  const dispatch = useDispatch();
  const submit = () => {
    dispatch(createShipment(shipment));
  };

  return (
    <div className='max-w-[700px] mx-auto bg-white mt-20 px-10 py-2 flex flex-col gap-3'>
      <h1 className='text-[#7d7d7d] text-center text-2xl font-bold mb-5'>
        {" "}
        Create New Shipment
      </h1>
      <div className='grid grid-cols-2 '>
        <label htmlFor=''>Shipment Type</label>
        <select
          name='shipmentType'
          id=''
          className='border-[#C3C3C3] border-2 rounded px-3 py-1 '
          value={shipment.shipmentType}
          onChange={(e) => handleInput(e)}
        >
          <option value=''>Select Option</option>
          <option value='import'>Import</option>
          <option value='export'>Export</option>
        </select>
      </div>
      {/* <div>
        <label htmlFor=''>Number</label>
        <input
          type='text'
          name='shipmentNumber'
          onChange={(e) => handleInput(e)}
          value={shipment.shipmentNumber}
        />
      </div> */}
      <div className='grid grid-cols-2 '>
        <label htmlFor=''> Shipping Line Name</label>
        <input
          type='text'
          name='shiplineName'
          value={shipment.shiplineName}
          className='border-[#C3C3C3] border-2 rounded px-3 py-1 '
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className='grid grid-cols-2 '>
        <label htmlFor=''> Final Delivery Place</label>
        <input
          type='text'
          name='deliveryPlace'
          className='border-[#C3C3C3] border-2 rounded px-3 py-1 '
          value={shipment.deliveryPlace}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className='grid grid-cols-2 '>
        <label htmlFor=''> Eta POD</label>
        <input
          type='date'
          className='border-[#C3C3C3] border-2 rounded px-3 py-1 '
          name='etaPod'
          value={shipment.etaPod}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className='grid grid-cols-2 '>
        <label htmlFor=''> SOB date</label>
        <input
          type='date'
          className='border-[#C3C3C3] border-2 rounded px-3 py-1 '
          name='SOBdate'
          value={shipment.SOBdate}
          onChange={(e) => handleInput(e)}
        />
      </div>
      {/* <div>
        <label htmlFor=''> Reference Number</label>
        <input
          type='text'
          name='referenceNumber'
          value={shipment.referenceNumber}
          onChange={(e) => handleInput(e)}
        />
          </div> */}

      <button onClick={submit}>Create</button>
    </div>
  );
};

export default NewShipment;
