import React, { useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";

import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import View from "../../assets/view.png";
import Table from "../../components/Table/Table";
import { shipmentData } from "../../features/shipmentSlice";
import { getShipmentByType } from "../../features/shipmentSlice";

const ShipmentData = () => {
  const data = useSelector(shipmentData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getShipmentByType({ shipmentType: "import" }));
  }, [dispatch]);

  const shipmentColumns = [
    {
      header: "S.No",
      accessorKey: "createdAt",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      header: "Shipping Line Name",
      accessorKey: "shiplineName",
    },
    {
      header: "Shipment Type",
      accessorKey: "shipmentType",
    },
    {
      header: "SOB",
      accessorKey: "SOBdate",
    },
    {
      header: "POL",
      accessorKey: "loadingPort.portName",
    },
    {
      header: "POD",
      accessorKey: "dischargePort.portName",
    },
    {
      header: "ETA",
      accessorKey: "etaPod",
    },
    {
      header: "Final POD",
      accessorKey: "deliveryPlace",
    },

    {
      header: "Actions",
      accessorKey: "_id",
      cell: ({ row }) => (
        <div className='flex gap-2'>
          <button
            onClick={() => navigate("viewshipment/" + row?.original?._id)}
          >
            <img src={View} className='h-4 w-4' alt='' />
          </button>
          <Link to={"createshipment/" + row?.original?._id}>
            <FiEdit2 />
          </Link>

          <button>
            <AiOutlineDelete className='text-red-500 font-bold text-lg' />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mx-1">

      <select
        name=''
        id=''
        onChange={(e) =>
          dispatch(getShipmentByType({ shipmentType: e.target.value }))
        }
      >
        <option value='import'>Import</option>
        <option value='export'>Export</option>
        </select>
        <div className="bg-font rounded px-3 py-1 text-white font-semibold capitalize">

        <Link to={"/newShipment"} >Create Shipment</Link>
        </div>
      </div>
      <div>
        {shipmentData && <Table columns={shipmentColumns} data={data} />}
      </div>
    </div>
  );
};

export default ShipmentData;
