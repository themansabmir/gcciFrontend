import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMBL } from "../../features/mblSlice";
import Table from "../../components/Table/Table";
import { shipmentData } from "../../features/mblSlice";
const ShipmentData = () => {
  const data=useSelector(shipmentData)
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getAllMBL());
  }, [dispatch]);

  const mblDataColumns = [
    {
      header: "S.No",
      accessorKey: "_id",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      header: "MBL Number",
      accessorKey:"mblNumber"
    },
  ];

  return <div>
    <div>
      {
        shipmentData &&
      <Table columns={mblDataColumns} data={data} />
      }
    </div>
  </div>;
};

export default ShipmentData;
