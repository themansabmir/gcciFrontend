import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const Shipping = () => {
  const [shippingMedium, setShippingMedium] = useState(""); // sea, air
  const [shippingType, setShippingType] = useState(""); // lcl fcl
  const [cargoType, setcargoType] = useState(""); // reefer general

  const [shippingLineName, setShippingName] = useState("");
  const [MBL, setMbl] = useState("");
  const [HBL, setHbl] = useState("");

  const [containerDetails, setContainerDetails] = useState([
    { containerNumber: "", containerType: "" },
  ]);

  const [commodity, setCommodity] = useState("");
  const [hsCode, setHsCode] = useState("");

  const [packages, setPackages] = useState("");
  const [packageType, setPackageType]= useState("")
  const [packageVolume,setPackageVolume] = useState("")

  const handleChange = (index, event) => {
    const values = [...containerDetails];
    console.log(values);

    values[index][event.target.name] = event.target.value;
    setContainerDetails(values);
  };
  const addField = (e) => {
    e.preventDefault();
    let newField = { containerNumber: "", containerType: "" };
    setContainerDetails([...containerDetails, newField]);
  };

  const containertypeOptions = [
    "20GP",
    "40GP",
    "40HQ",
    "20RF",
    "40RF",
    "20OT",
    "40OT",
    "20FR",
    "40FR",
  ];
  const submitHandler = () => {};
  return (
    <div className=''>
      <div>
        <Navbar />
      </div>
      <h1 className='text-white font-bold text-3xl uppercase ml-2 mt-2'>
        SHIPPING DETAILS
      </h1>
      <div className='m-4 w-11/12 mx-auto text-white uppercase tracking-wider'>
        <form onSubmit={submitHandler} className=''>
          <div className='flex justify-between'>
            <div className=' '>
              <label className='block mb-4'>Shipping Medium:</label>
              <select
                className='w-60 px-4 py-3 rounded text-black font-semibold cursor-pointer '
                id='shipping-medium'
                value={shippingMedium}
                onChange={(e) => setShippingMedium(e.target.value)}
              >
                <option value=''>Select</option>
                <option value='air'>Air</option>
                <option value='sea'>Sea</option>
              </select>
            </div>
            <div className=' '>
              <label htmlFor='shipping-medium' className='block mb-4'>
                Shipping Type
              </label>
              <select
                className='w-60 px-4 py-3 rounded text-black font-semibold cursor-pointer '
                id='shipping-medium'
                value={shippingType}
                onChange={(e) => setShippingType(e.target.value)}
              >
                <option value=''>Select</option>
                <option value='FCL'>FCL</option>
                <option value='LCL'>LCL</option>
                <option value='AIR'>AIR</option>
              </select>
            </div>
            <div className=' '>
              <label htmlFor='shipping-medium' className='block mb-4'>
                Cargo Type
              </label>
              <select
                className='w-60 px-4 py-3 rounded text-black font-semibold cursor-pointer '
                id='shipping-medium'
                value={cargoType}
                onChange={(e) => setcargoType(e.target.value)}
              >
                <option value=''>Select</option>
                <option value='general'>General</option>
                <option value='reefer'>Reefer</option>
              </select>
            </div>
          </div>

          <div className='flex justify-between mt-8'>
            <div className='flex flex-col '>
              <label htmlFor='' className='mb-2'>
                Shipping Line
              </label>
              <input
                value={shippingLineName}
                onChange={(e) => setShippingName(e.target.value)}
                type='text'
                placeholder='Shipping Line'
                className='px-4 py-2 w-60 text-black tracking-wider'
              />
            </div>
            <div className='flex flex-col '>
              <label htmlFor='' className='mb-2'>
                MBL
              </label>
              <input
                value={MBL}
                onChange={(e) => setMbl(e.target.value)}
                type='text'
                placeholder='MBL'
                className='px-4 py-2 w-60  text-black tracking-wider'
              />
            </div>
            <div className='flex flex-col '>
              <label htmlFor='' className='mb-2'>
                HBL
              </label>
              <input
                value={HBL}
                onChange={(e) => setHbl(e.target.value)}
                type='text'
                placeholder='HBL'
                className='px-4 py-2 w-60  text-black tracking-wider'
              />
            </div>
          </div>

          {containerDetails.map((item, index) => (
            <div key={index} className='flex justify-between mt-8'>
              <div id={index} className='flex flex-col w-60'>
                <label htmlFor='' className='mb-2'>
                  Container Numbers{" "}
                </label>
                <input
                  placeholder='Container Numbers'
                  className='px-4 py-2 w-60  text-black tracking-wider'
                  type='text'
                  name='containerNumber'
                  value={item.containerNumber}
                  onChange={(e) => handleChange(index, e)}
                  id={index}
                />
              </div>
              <div className='flex flex-col '>
                <label htmlFor='' className='mb-2'>
                  Container Type
                </label>
                <select
                  name=''
                  value={item.containerType}
                  onChange={(e) => handleChange(index, e)}
                  className='w-60 px-4 py-3 rounded text-black font-semibold cursor-pointer '
                  id={index}
                >
                  <option value='' selected>
                    {" "}
                    Select Container Type:
                  </option>
                  {containertypeOptions.map((item) => (
                    <option value={item}>{item} </option>
                  ))}
                </select>
              </div>

              <button
                type='btn'
                className='w-20 h-12 my-auto bg-red-400 mx-20'
                onClick={addField}
              >
                Add+
              </button>
            </div>
          ))}
          <div className='flex justify-between mt-8'>
            <div className='flex flex-col'>
              <label htmlFor='' className='mb-2'>
                Commodity
              </label>
              <input
                type='text'
                value={commodity}
                placeholder='Commodity'
                onChange={(e) => setCommodity(e.target.value)}
                className='px-4 py-2 w-60  text-black tracking-wider'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='' className='mb-2'>
                HS Code
              </label>
              <input
                type='text'
                value={hsCode}
                placeholder='Hs Code'
                onChange={(e) => setHsCode(e.target.value)}
                className='px-4 py-2 w-60  text-black tracking-wider'
              />
            </div>
          </div>

          <div className='flex justify-between mt-8'>
            <div className='flex flex-col'>
              <label htmlFor='' className='mb-2'>
                Number Of Packages
              </label>
              <input
                type='text'
                value={packages}
                placeholder='Packages Count'
                onChange={(e) => setPackages(e.target.value)}
                className='px-4 py-2 w-60  text-black tracking-wider'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='' className='mb-2'>
                Package Type
              </label>

              <select
                name=''
                id=''
                value={packageType} onChange={(e)=>setPackageType(e.target.value)}
                className='w-60 px-4 py-3 rounded text-black font-semibold cursor-pointer '
              >
                <option value=''>Package Type</option>
                <option value=''></option>
                <option value=''></option>
              </select>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='' className='mb-2'>
                Package Volume
              </label>

              <input
                type='text'
                name=''
                id=''
                value={packageVolume} onChange={(e)=> setPackageVolume(e.target.value)}
                className='px-4 py-2 w-60  text-black tracking-wider'
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
