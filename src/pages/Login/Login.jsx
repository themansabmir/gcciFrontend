import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginEmployee } from "../../features/employeeSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const data = { ...login };
    data[name] = value;
    setLogin(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginEmployee(login));
    navigate('/')
  };

  return (
    <div className='grid grid-cols-1 absolute gap-5 w-full min-h-screen bg-gray-400'>
      <div className='flex justify-center items-center '>
        <div>
          <div className='bg-white w-96 py-5 px-4 rounded flex flex-col shadow-lg shadow-gray-800'>
            <h1 className='text-center text-green-500 font-semibold text-4xl mb-5 '>
              {" "}
              GCCI PANEL
            </h1>

            <div className='w-full flex flex-col mb-4'>
              <label className='text-xl text-gray-700 font-semibold'>
                {" "}
                Email:
              </label>
              <input
                type='email'
                className='border border-gray-700 p-1 rounded-md mt-2'
                name='email'
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className='w-full flex flex-col'>
              <label className='text-xl text-gray-700 font-semibold'>
                Password:
              </label>
              <input
                type='password'
                name='password'
                className='border border-gray-700 p-1 rounded-md mt-2'
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <button
              onClick={(e) => submitHandler(e)}
              className='bg-primary text-center mt-5 rounded-md py-2 text-white text-lg font-semibold '
            >
              Log In
            </button>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
