import React, { useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";

import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import View from "../../assets/view.png";
import Table from "../../components/Table/Table";
import { getAllMBL, shipmentData } from "../../features/mblSlice";
const ShipmentData = () => {
  const data = useSelector(shipmentData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllMBL());
  }, [dispatch]);

  const mblDataColumns = [
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
      header: "MBL Number",
      accessorKey: "mblNumber",
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
          <Link to={"createshipment/"+row?.original?._id}>
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
      <div>
        {shipmentData && <Table columns={mblDataColumns} data={data} />}
      </div>
    </div>
  );
};

export default ShipmentData;
