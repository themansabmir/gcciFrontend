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

function App() {
  const [expand, setExpand] = useState(true);

  const token = useSelector(adminToken);

  return (
    <div className='flex'>
      <BrowserRouter>
        <div className={`w-2/12 top-0 mr-[0.5px] flex`}>
          {token && <Sidebar expand={expand} setExpand={setExpand} />}
        </div>

        {token ? (
          <div className={`w-10/12 bg-mainBg`}>
            <Routes>
              <Route
                path='/'
                index
                element={token || true ? <Dashboard /> : <Login />}
              />

              <Route path='/masters' element={<MasterNavbar />}>
                <Route index element={<User />} />
                <Route path='users' element={<User />} />
                <Route path='customers' element={<Customer />} />
                <Route path='createcustomer' element={<CreateCustomer />} />
              </Route>
              <Route path='/employees' element={<Employees />} />
              <Route path='/shipment' element={""}>
                <Route index element={<ShipmentData />} />
                <Route path='createshipment' element={<CreateShipment />} />
                <Route
                  path='createshipment/:shipmentId'
                  element={<CreateShipment />}
                />
                {/* <Route path="hbl" element={<HBL />} /> */}
                <Route path='viewShipment/:mblId' element={<ViewShipment />} />
              </Route>
              <Route path='/insight' element={<Insight />} />
              <Route path='/newShipment' element={<NewShipment />} />
              <Route path='/settings' element={<Settings />}></Route>
              <Route path='/test' element={<Test />} />
              <Route path="/sidebarcom" element={<SidebarComponent />} />
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
