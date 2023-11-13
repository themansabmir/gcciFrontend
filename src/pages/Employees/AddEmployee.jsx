import React, { useEffect, useState } from "react";
import { createEmployee } from "../../features/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { departmentsData, getDepartments } from "../../features/taskSlice";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const [showModal, setShow] = useState(false);
  const department = useSelector(departmentsData);
  const [selectedDept, setDepartments] = useState(Array.from(department).fill(null));
  const [employee, setEmployee] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "",
    employeeId: "",
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
      selectedDept
    };
    dispatch(createEmployee(employeeData));

    resetState();
  };
  const permissions = ["Read", "Write", "Update", "Delete"];



const deptHandler = (e, departmentName) => {
  const isChecked = e.target.checked;
  if (isChecked) {
    setDepartments((prevDepartments) => [
      ...prevDepartments,
      {
        departmentName,
        permissions: [],
      },
    ]);
  } else {
    setDepartments((prevDepartments) =>
      prevDepartments.filter(
        (department) => department.departmentName !== departmentName
      )
    );
  }
};



 const handlePermissionChange = (e, departmentName, permission) => {
   const isChecked = e.target.checked;
   setDepartments((prevDepartments) =>
     prevDepartments.map((department) => {
       if (department.departmentName === departmentName) {
         if (isChecked) {
           return {
             ...department,
             permissions: [...department.permissions, permission],
           };
         } else {
           return {
             ...department,
             permissions: department.permissions.filter(
               (p) => p !== permission
             ),
           };
         }
       }
       return department;
     })
   );
 };










  console.log("selectedDept", selectedDept);
  const permissionHandler = (
    dept,
    deptIndex,
    permission,
    permissionIndex
  ) => {};

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);
  return (
    <div className=''>
      {showModal && (
        <div className='fixed bg-black w-full min-h-screen top-0 justify-center items-center flex  left-0 bg-opacity-80'>
          <div className='bg-white flex flex-col gap-2 list-none w-4/12  px-4 py-3  '>
            <div className='flex justify-between'>
              <h1 className='text-xl font-bold text-gray-900'>Departments</h1>
              <span className='cursor-pointer' onClick={() => setShow(false)}>
                X
              </span>
            </div>
            {department &&
              department.map((item, departmentIndex) => {
                return (
                  <div key={departmentIndex}>
                    <div className='flex gap-2'>
                      <input
                        type='checkbox'
                        name='departmentName'
                        value={item.departmentName}
                        onChange={(e) => deptHandler(e,item._id,)}
                      />{" "}
                      <p>{item.departmentName}</p>
                    </div>
                    <div className='flex gap-4'>
                      {permissions.map((permission, permissionIndex) => {
                        return (
                          <div className='flex gap-1'>
                            <input
                              type='checkbox'
                              name='permissions'
                              onChange={(e) => handlePermissionChange(e, item._id,permission)}
                              id=''
                              value={permission}
                            />{" "}
                            <p>{permission}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <form
        onSubmit={submitHandler}
        className='flex flex-col  max-w-[800px] mx-auto gap-4 shadow-lg px-5 py-3 mt-4 bg-white '
      >
        <h1 className='text-gray-800 font-semibold text-lg'>Add Employee</h1>
        <hr />
        <div className='grid grid-cols-2'>
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
        </div>
        <div className='grid grid-cols-2'>
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
              type='password'
              name='password'
              className='w-60 border-b-2 border-gray-900 focus:outline-none focus:border-teal-700 outline-none text-black font-semibold'
            />
          </div>
        </div>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col '>
            <label className='text-xl text-gray-800 '>Role</label>
            <input
              value={employee.role}
              onChange={handleChange}
              type='text'
              name='role'
              className='w-60 border-b-2 border-gray-900 focus:outline-none focus:border-teal-700 outline-none text-black font-semibold'
            />
          </div>
          <div>
            <label htmlFor='' className='block'>
              Employee ID
            </label>
            <input
              type='text'
              value={employee.employeeId}
              onChange={handleChange}
              name='employeeId'
              className='w-60 border-b-2 border-gray-900 focus:outline-none focus:border-teal-700 outline-none text-black font-semibold'
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => setShow(true)}
            type='button'
            className='text-gray-800 font-semibold text-sm border-2 border-gray-900 px-2 py-1'
          >
            Assign Departments
          </button>
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
  );
};

export default AddEmployee;
