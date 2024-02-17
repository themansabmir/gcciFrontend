import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomerType } from "../../features/customerSlice";

export const CreateCustomertype = () => {
  const [customerType, setCustomerType] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCustomerType({ customerType }));
  };
  return (
    <div>
      {/*  Create form  */}
      <div>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className='bg-white w-full py-4 my-4 '>
            <div className='mx-5'>
              <Input
                variant='standard'
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value)}
                label='Customer Type'
                placeholder='Customer Type'
                size='md'
              />
              <Button type='Submit'  className='mt-5'>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
