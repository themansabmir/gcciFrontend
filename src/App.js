import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";

import Sidebar from "./components/Sidebar/Sidebar";
import Customer from "./pages/Master/User/Customer";
import User from "./pages/Master/User/User";
import { MasterNavbar } from "./pages/Navbar/Navbar";
import Settings from "./pages/Settings/Settings";

import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminToken } from "./features/employeeSlice";
import Employees from "./pages/Employees/Employees";
import Login from "./pages/Login/Login";
import CreateCustomer from "./pages/Master/User/CreateCustomer";
import CreateShipment from "./pages/Shipment/CreateShipment";
import NewShipment from "./pages/Shipment/NewShipment";
import ShipmentData from "./pages/Shipment/ShipmentData";
import ViewShipment from "./pages/Shipment/ViewShipment";
import Test from "./test/Test";
import Insight from "./pages/Insight/Insight";
import { SidebarComponent } from "./SidebarComponent";
import AddEmployee from "./pages/Employees/AddEmployee";

function App() {
  const [expand, setExpand] = useState(true);

  const token = useSelector(adminToken);

  return (
    <div className='flex'>
      <BrowserRouter>
        <div className={` top-0 mr-[0.5px] flex`}>
          {token && <Sidebar expand={expand} setExpand={setExpand} />}
        </div>

        {token ? (
          <div className={`w-full bg-mainBg`}>
            <Routes>
              <Route
                path='/'
                index
                element={token || true ? <Dashboard /> : <Login />}
              />

              {/* Masters Drop down */}
              <Route path='/masters/customers' element={<Customer />} />
              <Route path='/masters/employees' element={<User />} />
              <Route path='/masters/createEmployee' element={<AddEmployee />} />
              <Route
                path='/masters/createcustomer'
                element={<CreateCustomer />}
              />
              <Route path='/employees' element={<Employees />} />

              {/* Shipment DropDown */}
              <Route path='/shipments' element={<ShipmentData />} />

              <Route
                path='/shipments/createshipment'
                element={<CreateShipment />}
              />
              <Route
                path='/shipments/createshipment/:shipmentId'
                element={<CreateShipment />}
              />
              {/* <Route path="hbl" element={<HBL />} /> */}
              <Route
                path='/shipments/viewShipment/:mblId'
                element={<ViewShipment />}
              />

              <Route path='/insight' element={<Insight />} />
              <Route path='/shipments/newShipment' element={<NewShipment />} />
              <Route path='/settings' element={<Settings />}></Route>
              <Route path='/test' element={<Test />} />
              <Route path='/sidebarcom' element={<SidebarComponent />} />
            </Routes>
          </div>
        ) : (
          <>
            <Routes>
              <Route path='/' element={<Login />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
