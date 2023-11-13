import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import DataCard from "../../components/DataCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getShipmentsbyDate,
  shipmentsByDate,
} from "../../features/dashboardSlice";
import View from "../../assets/view.png";

import Table from "../../components/Table/Table";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { loader, tasks, tasksByShipmentId, updateTask } from "../../features/taskSlice";
const Dashboard = () => {
  const shipmentsData = useSelector(shipmentsByDate);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const loading = useSelector(loader);
  const taskData = useSelector(tasks);

  const [taskModal, setTaskModal] = useState("");
  const [showtaskModal, setShow] = useState(false);


  const handleTasksModal = (id, tasksArr) => {
    dispatch(tasksByShipmentId({ shipmentId: id })).then(() => {
      setTaskModal(taskData);
    });
  }

    const updateTaskStatus = (item, e) => {
      const data = {
        taskId: item?._id,
        taskStatus: e.target.value,
      };
      dispatch(updateTask(data));
    };
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
        header: "Reference Number",
        accessorKey: "referenceNumber",
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
            <Link to={"/shipment/createshipment/" + row?.original?._id}>
              <FiEdit2 />
            </Link>

            <button>
              <AiOutlineDelete className='text-red-500 font-bold text-lg' />
            </button>
            <button
              onClick={() => {
                if (taskModal.length > 0) {
                  setTaskModal("");
                } else {
                  setShow(true);
                  handleTasksModal(row.original._id, row.original.tasks);
                }
              }}
            >
              <HiOutlineDotsVertical />
            </button>
          </div>
        ),
      },
    ];
    useEffect(() => {
      dispatch(
        getShipmentsbyDate({
          shipmentType: "import",
          userDate: new Date().toISOString().split("T")[0],
        })
      );
    }, []);

    return (
      <div className=' flex flex-col'>
        {showtaskModal === true && loading === false && (
          <div className='fixed min-h-screen items-center justify-center  top-0 left-0 bg-black bg-opacity-80 w-full flex flex-col'>
            <div className='bg-white px-10 py-5 rounded '>
              <h1 className='text-start text-xl font-semibold'>Task List</h1>
              {taskData.map((item) => {
                return (
                  <div className=''>
                    <div className='grid grid-cols-2 gap-5 my-1'>
                      <p> {item.taskName}</p>
                      <select
                        name='taskStatus'
                        id=''
                        value={item.taskStatus}
                        onChange={(e) => {
                          updateTaskStatus(item, e);
                        }}
                      >
                        <option value='pending'>Pending</option>
                        <option value='progress'>Progress</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </div>
                  </div>
                );
              })}
              <button
                onClick={() => {
                  setShow(false);
                  setTaskModal("");
                }}
                className='border-red-500 border-2 px-3 py-1 text-red-500 mt-4 rounded hover:bg-red-500 hover:text-white'
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className=''>
          <Navbar />
        </div>

        <div className='grid grid-cols-4 mt-3 mx-4 gap-x-5'>
          <DataCard title={"Import Shipments"} value={"150"} />
          <DataCard title={"Export Shipments"} value={"350"} />
          <DataCard title={"Total Profit"} value={"$5482"} />
          <DataCard title={"Total Expense"} value={"$2150"} />
        </div>

        <div className="mt-4 px-3 bg-white shadow-md py-3 mx-4">
          <div className='flex justify-between mb-3 mt-2'>
            <select
              name=''
              className="w-40 px-3  py-1 rounded-sm bg-white text-gray-700 border border-gray-700"
              id=''
              onChange={(e) =>
                dispatch(getShipmentsbyDate({ shipmentType: e.target.value }))
              }
            >
              <option value='import'>Import</option>
              <option value='export'>Export</option>
            </select>
            <div className='bg-font rounded px-3 py-1 text-white font-semibold capitalize'>
              <Link to={"/newShipment"}>Create Shipment</Link>
            </div>
          </div>
          {shipmentsData && (
            <Table data={shipmentsData} columns={shipmentColumns} />
          )}
        </div>
      </div>
    );
  };


export default Dashboard;
