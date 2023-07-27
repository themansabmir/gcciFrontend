import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdAdminPanelSettings } from 'react-icons/md'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { MdOutlineAccountBalance } from 'react-icons/md'
import { FaSearchLocation } from 'react-icons/fa'
import { FaTasks } from 'react-icons/fa'
import { PiGearSix } from 'react-icons/pi'
import { GiCargoShip } from "react-icons/gi";
const Sidebar = ({expand, setExpand}) => {
  // const [expand, setExpand] = useState(false)
  return (
    <div
      className={` relative w-full  left-0 top-0 bg-sidebar min-h-screen transition-all duration-500 ease-in  `}
    >
      <h1 className='text-4xl  text-center font-bold mb-8 pb-4 pt-4 text-font '>
        GCCI PANEL
      </h1>

      <div className='uppercase min-h-screen  flex flex-col gap-4 text-sm  text-left ml-2  text-white mt-4'>
        <li className='hover:bg-font  flex items-center  justify-center hover:scale-[0.9] transition-all duration-200 ease-in font-semibold rounded'>
          <NavLink
            to={"/"}
            style={({ isActive }) => ({
              width: "100%",
              padding: "5px",
              color: isActive ? "#181818" : "#fff",

              background: isActive ? "#25C935" : "transparent",
              paddingTop: "5px",
              paddingBottom: "5px",
              ":hover": { background: "red" },
            })}
          >
            <li className='flex items-center gap-2'>
              <LuLayoutDashboard /> Dashboard
            </li>
          </NavLink>
        </li>
        <li className='hover:bg-font  flex items-center  justify-center hover:scale-[0.9] transition-all duration-200 ease-in font-semibold rounded'>
          <NavLink
            to={"/masters"}
            style={({ isActive }) => ({
              width: "100%",
              padding: "5px",
              color: isActive ? "#181818" : "#fff",

              background: isActive ? "#25C935" : "transparent",
              paddingTop: "5px",
              paddingBottom: "5px",

            })}
          >
            <li className='flex items-center gap-2'>
              <MdAdminPanelSettings /> Masters
            </li>
          </NavLink>
        </li>
        <li className='hover:bg-font rounded flex items-center  justify-center hover:scale-[0.9] transition-all duration-200 ease-in font-semibold '>
          <NavLink
            to={"/shipment"}
            style={({ isActive }) => ({
              width: "100%",
              padding: "5px",
              color: isActive ? "#181818" : "#fff",

              background: isActive ? "#25C935" : "transparent",
              paddingTop: "5px",
              paddingBottom: "5px",
              ":hover": { background: "red" },
            })}
          >
            <li className='flex items-center  gap-2'>
              <GiCargoShip /> Shipment
            </li>
          </NavLink>
        </li>

        <li className='mt-auto '>
          <li className='hover:bg-font  flex items-center  justify-center hover:scale-[0.9] transition-all duration-200 ease-in font-semibold rounded'>
            <NavLink
              to={"/settings"}
              style={({ isActive }) => ({
                width: "100%",
                padding: "5px",
                color: isActive ? "#181818" : "#fff",

                background: isActive ? "#25C935" : "transparent",
                paddingTop: "5px",
                paddingBottom: "5px",
              })}
            >
              <li className='flex items-center gap-2'>
                <PiGearSix /> Settings
              </li>
            </NavLink>
          </li>
        </li>
        <li className='mb-auto'>
          <li className='hover:bg-font  flex items-center  justify-center hover:scale-[0.9] transition-all duration-200 ease-in font-semibold rounded'>
            <NavLink
              to={"/logout"}
              style={({ isActive }) => ({
                width: "100%",
                padding: "5px",
                color: isActive ? "#181818" : "#fff",

                background: isActive ? "#25C935" : "transparent",
                paddingTop: "5px",
                paddingBottom: "5px",
              })}
            >
              <li className='flex items-center gap-2'>
                <PiGearSix /> Log Out
              </li>
            </NavLink>
          </li>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
