import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";

import Sidebar from "./components/Sidebar/Sidebar";
import User from "./pages/Master/User/User";
import { MasterNavbar, ShipmentNavbar } from "./pages/Navbar/Navbar";
import Customer from "./pages/Master/User/Customer";
import Settings from "./pages/Settings/Settings";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import MBL from "./pages/Shipment/MBL";
import HBL from "./pages/Shipment/HBL";
import ShipmentData from "./pages/Shipment/ShipmentData";
import CreateShipment from "./pages/Shipment/CreateShipment";
import Test from "./test/Test";
import CreateCustomer from "./pages/Master/User/CreateCustomer";
import ViewShipment from "./pages/Shipment/ViewShipment";
import NewShipment from "./pages/Shipment/NewShipment";

function App() {
  const [expand, setExpand] = useState(true);
  return (
    <div className='flex'>
      <BrowserRouter>
        <div className={`w-2/12 top-0 mr-[0.5px] flex`}>
          <Sidebar expand={expand} setExpand={setExpand} />
        </div>
        <div className={`w-10/12 bg-mainBg`}>
          <Routes>
            <Route path='/' index element={<Dashboard />} />

            <Route path='/masters' element={<MasterNavbar />}>
              <Route index element={<User />} />
              <Route path='users' element={<User />} />
              <Route path='customers' element={<Customer />} />
              <Route path='createcustomer' element={<CreateCustomer />} />
            </Route>
            <Route path='/shipment' element={""}>
              <Route index element={<ShipmentData />} />
              <Route path='createshipment' element={<CreateShipment />} />
              <Route path='createshipment/:shipmentId' element={<CreateShipment />} />
              {/* <Route path="hbl" element={<HBL />} /> */}
              <Route
                path='viewShipment/:mblId'
                element={<ViewShipment />}
              />
            </Route>
            <Route path="/newShipment" element={<NewShipment />} />
            <Route path='/settings' element={<Settings />}></Route>
            <Route path='/test' element={<Test />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
