import React, { useState } from "react";
import User from "../Master/User/User";
import AddEmployee from "./AddEmployee";

const Employees = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "Employees",
      content: <User />,
    },
    {
      label: "Add Employee",
      content: <AddEmployee />,
    },
  ];

  return (
    <div>
      <div className='flex gap-3 ml-5 text-lg font-semibold mt-2 '>
        {tabs.map((item, i) => {
          return (
            <div
              className={`cursor-pointer list-none my-2 px-2 py-1 text-lg ml-5  ${
                activeTab === i ? `bg-primary  text-white  shadow-md ` : ""
                      } `}
                  onClick={()=> setActiveTab(i)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Employees;
