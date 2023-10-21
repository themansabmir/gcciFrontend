import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";

import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import View from "../../assets/view.png";
import Table from "../../components/Table/Table";
import { shipmentData } from "../../features/shipmentSlice";
import { getShipmentByType } from "../../features/shipmentSlice";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { loader, tasks, tasksByShipmentId, updateTask } from "../../features/taskSlice";

const ShipmentData = () => {
  const data = useSelector(shipmentData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [taskModal, setTaskModal] = useState("");
  const [showtaskModal, setShow] = useState(false);
  const loading = useSelector(loader)

  useEffect(() => {
    dispatch(getShipmentByType({ shipmentType: "import" }));
  }, [dispatch]);

  const taskData = useSelector(tasks);

  const handleTasksModal = (id, tasksArr) => {
    dispatch(tasksByShipmentId({ shipmentId: id })).then(() => {
      setTaskModal(taskData);
    });

    // setTaskModal(taskData);
  };

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
          <Link to={"createshipment/" + row?.original?._id}>
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
                setShow(true)
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

  return (
    <div>
      {(showtaskModal===true && loading===false)  && (
        <div className='fixed min-h-screen items-center justify-center  top-0 left-0 bg-black bg-opacity-80 w-full flex flex-col'>
          <div className='bg-white px-10 py-5 rounded '>
            <h1 className="text-start text-xl font-semibold">Task List</h1>
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
            <button onClick={() => {
              setShow(false)
              setTaskModal("")
            }

            } className="border-red-500 border-2 px-3 py-1 text-red-500 mt-4 rounded hover:bg-red-500 hover:text-white">Close</button>
          </div>
        </div>
      )}
      <div className='flex justify-between mx-1'>
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
        <div className='bg-font rounded px-3 py-1 text-white font-semibold capitalize'>
          <Link to={"/newShipment"}>Create Shipment</Link>
        </div>
      </div>
      <div>
        {shipmentData && <Table columns={shipmentColumns} data={data} />}
      </div>
    </div>
  );
};

export default ShipmentData;
