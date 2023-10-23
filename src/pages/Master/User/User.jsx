import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/Table/Table";
import {
  createEmployee,
  getAllEmployee,
} from "../../../features/employeeSlice";

// user employee component
const User = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.getEmployee);
  useEffect(() => {
    dispatch(getAllEmployee());
  }, [dispatch]);

  const [slider, setSlider] = useState(false);

  const [employee, setEmployee] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const resetState = () => {
    setEmployee({
      fullname: "",
      username: "",
      email: "",
      password: "",
      role: "",
    });
  };
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { fullname, username, email, password, role } = employee;
    const employeeData = {
      fullname,
      email,
      username,
      password,
      role,
    };
    dispatch(createEmployee(employeeData));
    setSlider(false);
    resetState();
  };

  const employeeColumns = [
    {
      header: "ID",
      accessorKey: "",
      cell: ({ row }) => <span>{row.index + 1} </span>,
    },
    {
      header: "Name",
      accessorKey: "fullname",
    },
    {
      header: "Username",
      accessorKey: "username",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Actions",
      accessorKey: "",
    },
  ];

  return (
    <div className='overflow-x-hidden  '>
      <div>
        {/* <MasterNavbar /> */}
        {/*  table section */}
        <div className='  '>
          {/* <button
            className='bg-green-600 px-3 py-2 inline uppercase text-white font-semibold'
            onClick={() => setSlider(!slider)}
          >
            {slider ? "Cancel" : "Add Employee"}
          </button> */}
          <div className="bg-white px-2 shadow-md py-2 mx-5 mt-10">
            <h1 className="text-xl font-bold text-gray-900">Employees List</h1>
            {employees && <Table data={employees} columns={employeeColumns} />}
          </div>
        </div>

        {/*  form section  */}
        {/* <div className=' '>
          <div
            className={
              slider
                ? "transition-all bg-white  z-40 ease-in duration-700 shadow-2xl px-8 py-4 min-h-screen fixed float-right right-0 top-0"
                : "" +
                  "bg-white z-40 transition-all ease-in  duration-700 float-right px-8 py-4 fixed shadow-lg min-h-screen  -right-80 -top-0 "
            }
          >
            <h1 className='text-2xl uppercase'>Add Employee</h1>
            <form
              onSubmit={submitHandler}
              className='flex flex-col gap-4 mt-4 '
            >
              <div className='flex flex-col '>
                <label className='text-xl text-gray-800 '>Full Name</label>
                <input
                  value={employee.fullname}
                  onChange={handleChange}
                  type='text'
                  name='fullname'
                  className='w-60 border-b-2 border-gray-900 focus:outline-none focus:border-teal-700 outline-none text-black font-semibold'
                />
              </div>
              <div className='flex flex-col '>
                <label className='text-xl text-gray-800 '>Email</label>
                <input
                  value={employee.email}
                  onChange={handleChange}
                  type='email'
                  name='email'
                  className='w-60 border-b-2 border-gray-900 focus:outline-none focus:border-teal-700 outline-none text-black font-semibold'
                />
              </div>
              <div className='flex flex-col '>
                <label className='text-xl text-gray-800 '>Username</label>
                <input
                  value={employee.username}
                  onChange={handleChange}
                  type='text'
                  name='username'
                  className='w-60 border-b-2 border-gray-900 focus:outline-none focus:border-teal-700 outline-none text-black font-semibold'
                />
              </div>
              <div className='flex flex-col '>
                <label className='text-xl text-gray-800 '>Password</label>
                <input
                  value={employee.password}
                  onChange={handleChange}
                  type='text'
                  name='password'
                  className='w-60 border-b-2 border-gray-900 focus:outline-none focus:border-teal-700 outline-none text-black font-semibold'
                />
              </div>
              <div className='flex flex-col '>
                <label className='text-xl text-gray-800 '>Role</label>
                <select
                  name='role'
                  value={employee.role}
                  onChange={handleChange}
                  className='w-60 px-4 py-3 bg-white hover:bg-slate-100 '
                >
                  <option value=''>Select Role</option>
                  <option value='master'>Master</option>
                  <option value='export'>Export</option>
                  <option value='import'>Import</option>
                  <option value='accounting'>Accounting</option>
                  <option value='agent'>Agent</option>
                </select>
              </div>
              <div className='flex mt-4 justify-between'>
                <button
                  type='submit'
                  className='bg-teal-600 px-4 py-3 uppercase text-white font-semibold '
                  disabled={
                    !(
                      employee.fullname &&
                      employee.email &&
                      employee.username &&
                      employee.password &&
                      employee.role
                    )
                  }
                >
                  Submit
                </button>
                <button
                  type='button'
                  onClick={resetState}
                  className='bg-red-500 px-4 py-3 uppercase text-white font-semibold '
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div> */}
      </div>

    </div>
  );
};

export default User;
