import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import api from "./axiosInstance";
import Sidebar from "./components/Sidebar/Sidebar";
import Shipping from "./pages/Shipping/Shipping";
function App() {
  return (
    <div className='flex  w-full'>
      <BrowserRouter>
        <div className='w-2/12'>
          <Sidebar />
        </div>
        <div className='w-10/12 bg-mainBg'>
          <Routes>
            <Route path='/' index element={<Dashboard />} />
            <Route path='shipping' element ={<Shipping />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
