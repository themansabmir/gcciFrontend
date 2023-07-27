import { BrowserRouter, Routes, Route, } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";

import Sidebar from "./components/Sidebar/Sidebar";
import User from "./pages/Master/User/User";
import { MasterNavbar } from "./pages/Navbar/Navbar";
import Customer from "./pages/Master/User/Customer";
import Settings from "./pages/Settings/Settings";

 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function App() {
  const [expand, setExpand]= useState(true)
  return (
    <div className='flex  w-full '>
      <BrowserRouter>
        <div className={`w-2/12  top-0 mr-[0.5px] flex`}  >
          <Sidebar expand={ expand} setExpand={setExpand} />
        </div>
        <div className={`${expand?`w-10/12`:`w-full`} bg-mainBg`}>
          <Routes>
            <Route path='/' index element={<Dashboard />} />

            <Route path='/masters' element={ <MasterNavbar />}>
              <Route index element={<User />} />
              <Route path='users' element={<User />} />
              <Route path="customers" element={ <Customer />} />

            </Route>
            <Route path="/settings" element={<Settings />} >

            </Route>
          </Routes>
        </div>

      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
