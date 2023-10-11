import React from "react";

const CreateCustomer = () => {
  return (
    <div className="bg-gray-300 min-h-screen">
      <div>
        <h1 className="text-3xl font-semibold uppercase px-3 py-3"> Create New Customer</h1>
        <div className='grid grid-cols-2 gap-10 mx-20'>
          <div>
            <div className=''>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900 block'
              >
                Company Name
              </label>
              <input type='text' name='companyName' />
            </div>
            <div className=''>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900 block'
              >
                Telephone
              </label>
              <input type='text' name='telephoneNumber' />
            </div>
            <div className=''>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900 block'
              >
                Mobile
              </label>
              <input type='text' name='mobileNumber' />
            </div>
            <div className=''>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 text-gray-900 block'
              >
                Email
              </label>
              <input type='text' name='email' />
            </div>
            <div className=' '>
              <label
                htmlFor=''
                className='text-sm font-medium leading-6 block  text-gray-900'
              >
                Fax
              </label>
              <input type='text' name='fax' />
            </div>
            <div className=''>
              <label
                htmlFor=''
                className='text-sm font-medium block leading-6 text-gray-900'
              >
                Pan Number
              </label>
              <input type='text' name='panNumber' />
            </div>
            <div className=''>
              <label
                htmlFor=''
                className='text-sm font-medium block leading-6 text-gray-900'
              >
                GST Number
              </label>
              <input type='text' name='gstNumber' />
            </div>
          </div>
              <div>
                  <h1>Customer Address</h1>
        </div>
              </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
