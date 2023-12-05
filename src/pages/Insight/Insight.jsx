import React, { useEffect, useState } from "react";
import ExcelReader from "../../components/ExcelReader/ExcelReader";
import { useDispatch, useSelector } from "react-redux";
import {
  destinationData,
  getInsightByPortsData,
  journeyData,
  originData,
} from "../../features/insightSlice";
import { customersData } from "../../features/customerSlice";
import { PieChart, Pie } from "recharts";

const Insight = () => {
  const dispatch = useDispatch(); // to dispatch redux actions
  const [customerId, setCustomerId] = useState(""); // state handling

  // data from redux states
  const customers = useSelector(customersData);
  const origin = useSelector(originData);
  const destination = useSelector(destinationData);
  const journey = useSelector(journeyData);

  console.log(origin)

  // on selecting customer, fetch it's insight data
  useEffect(() => {
    if (customerId) {
      const payload = {
        originPortCode: true,
        destinationPortCode: true,
        customerId: customerId,
      };
      dispatch(getInsightByPortsData(payload));
    }
  }, [customerId]);
  return (
    <div>
      {/* bulk excel data upload for insgths */}
      <ExcelReader />

      {/* insight graphs for origin, destination and journey */}
      <select
        name='customers'
        id=''
        onChange={(e) => setCustomerId(e.target.value)}
      >
        <option value=''> Select Customer</option>
        {customers &&
          customers.map((customer) => {
            const { companyName, _id } = customer;
            return <option value={_id}> {companyName}</option>;
          })}
      </select>

      <div className='w-full grid grid-cols-2 gap-5 mx-2 px-4 py-5 bg-white mt-2 shadow-md'>
        <div>
          <h1>Origin Ports</h1>
          <div>
            <PieChart
              width={350}
              height={400}
              outerRadius={50}
              cx='50%'
              cy='50%'
              fill='#8884d8'
            >
              <Pie data={origin} dataKey={"count"} nameKey={"count"} label={"originName"} />
            </PieChart>
          </div>
        </div>
        <div>
          <h1>Destination Ports</h1>
          <div>Pie chart</div>
        </div>
      </div>
    </div>
  );
};

export default Insight;
