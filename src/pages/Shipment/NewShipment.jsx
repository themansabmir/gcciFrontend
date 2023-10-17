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
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    const data = { ...shipment };

    console.log(name, value);

    data[name] = value;
    setShipment(data);
  };

  const dispatch = useDispatch();
  const submit = () => {
    dispatch(createShipment(shipment));
  };

  return (
    <div>
      <div>
        <label htmlFor=''>Shipment Type</label>
        <select
          name='shipmentType'
          id=''
          value={shipment.shipmentType}
          onChange={(e) => handleInput(e)}
        >
          <option value=''>Select Option</option>
          <option value='import'>Import</option>
          <option value='export'>Export</option>
        </select>
      </div>
      <div>
        <label htmlFor=''>Number</label>
        <input
          type='text'
          name='shipmentNumber'
          onChange={(e) => handleInput(e)}
          value={shipment.shipmentNumber}
        />
      </div>
      <div>
        <label htmlFor=''> Shipping Line Name</label>
        <input
          type='text'
          name='shiplineName'
          value={shipment.shiplineName}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div>
        <label htmlFor=''> Final Delivery Place</label>
        <input
          type='text'
          name='deliveryPlace'
          value={shipment.deliveryPlace}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div>
        <label htmlFor=''> Eta POD</label>
        <input
          type='text'
          name='etaPod'
          value={shipment.etaPod}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div>
        <label htmlFor=''> Reference Number</label>
        <input
          type='text'
          name='referenceNumber'
          value={shipment.referenceNumber}
          onChange={(e) => handleInput(e)}
        />
          </div>

          <button onClick={submit}>Create</button>
    </div>
  );
};

export default NewShipment;
