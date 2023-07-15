import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='w-full sticky left-0 top-0 bg-cardBg min-h-screen border-r-[0.125px]  border-primary'>
      <h1 className='text-3xl text-font text-center font-bold mb-8 pb-4 pt-4 border-b-2'>
        GCCI PANEL
      </h1>

      <div className='uppercase flex flex-col gap-4  text-left mx-auto w-2/3 text-white mt-4'>
        <NavLink to={'/'}>Dashboard</NavLink>
        <NavLink to={'/shipping'}>Shipping</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
