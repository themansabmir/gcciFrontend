import React from "react";
import { NavLink, Outlet , } from "react-router-dom";

const Navbar = () => {
  return <div className='pb-8 text-3xl  border-b-2  '>Navbar</div>;
};

export default Navbar;

export const MasterNavbar = () => {
  return (
    <div>

    <div className='w-full bg-sidebar'>
      <nav className='flex justify-between bg-sidebar text-white  w-11/12 mx-auto py-4'>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#fff",
            borderBottom: isActive && "2px #25C935 solid ",
          })}
          to={"users"}
        >
          {" "}
          Users
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#fff",
            borderBottom: isActive && "2px #fff solid",
          })}
          to={"/masters/customers"}
        >
          {" "}
          Customers
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#fff",
            borderBottom: isActive && "2px #fff solid",
          })}
          to={"/masters/shippingline"}
        >
          {" "}
          Shipping Line
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#fff",
            borderBottom: isActive && "2px #fff solid",
          })}
          to={"forwarders"}
        >
          {" "}
          Forwarders
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#fff",
            borderBottom: isActive && "2px #fff solid",
          })}
          to={"agents"}
        >
          {" "}
          Agents
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#fff",
            borderBottom: isActive && "2px #fff solid",
          })}
          to={"cha"}
        >
          {" "}
          CHA
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#fff",
            borderBottom: isActive && "2px #fff solid",
          })}
          to={"ports"}
        >
          {" "}
          Ports
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#fff",
            borderBottom: isActive && "2px #25C935 solid",
          })}
          to={"airports"}
        >
          {" "}
          Airports
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#fff",
            borderBottom: isActive && "2px #fff solid",
          })}
          to={"currencies"}
        >
          {" "}
          Currencies
        </NavLink>
      </nav>
    </div>
<Outlet />
    </div>
  );
};
