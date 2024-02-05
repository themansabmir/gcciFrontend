import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ExcelReader from "../../components/ExcelReader/ExcelReader";
import { customersData } from "../../features/customerSlice";
import {
  destinationData,
  getInsightByPortsData,
  journeyData,
  originData,
} from "../../features/insightSlice";

const Insight = () => {
  const dispatch = useDispatch(); // to dispatch redux actions
  const [customerId, setCustomerId] = useState(""); // state handling

  // data from redux states
  const customers = useSelector(customersData);
  const origin = useSelector(originData);
  const destination = useSelector(destinationData);
  const journey = useSelector(journeyData);
  console.log(journey);

  const modifiedData = journey?.map((item) => ({
    count: item.count,
    label: item.originName + " " + item.destination,
  }));

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

      <div className='grid grid-cols-2 mx-2 px-4 py-5 bg-white mt-2 shadow-md'>
        <div className=''>
          <h1 className='text-center font-semibold text-xl'>Origin Ports</h1>
          <div className='font-normal text-black'>
            <ResponsiveContainer
              width={"100%"}
              aspect={1}
              className={"text-black"}
            >
              <PieChart>
                <Pie
                  className='text-black text-[18px]'
                  data={origin}
                  dataKey='count'
                  nameKey='originName'
                  label
                  cx={300}
                  cy={300}
                  outerRadius={250}
                  fill='#8884d8'
                >
                  <LabelList
                    dataKey='originName'
                    position='insideTop'
                    className='text-[12px]'
                  />

                  {/* <LabelList dataKey='count' position='outside' /> */}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='relative  '>
          <h1 className='text-center font-semibold text-xl'>
            Destination Ports
          </h1>
          <div className='font-normal text-black '>
            {/* <ResponsiveContainer width={"100%"} aspect={1}>
              <LineChart
                data={origin}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='originName' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='count' stroke='#8884d8'>
                  <LabelList
                    dataKey='originName'
                    position='insideTop'
                    angle='45'
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer> */}
            <ResponsiveContainer
              minWidth={"100%"}
              aspect={1}
              className={"text-black"}
            >
              <PieChart>
                <Pie
                  className='text-black text-[18px]'
                  data={destination}
                  dataKey='count'
                  nameKey='destination'
                  label
                  cx={280}
                  cy={300}
                  outerRadius={250}
                  fill='#8884d8'
                >
                  <LabelList
                    dataKey='destination'
                    position='insideTop'
                    className='text-[12px]'
                  />

                  {/* <LabelList dataKey='count' position='outside' /> */}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='mx-2 bg-white shadow-md mt-5'>
        <h1 className='text-center font-semibold text-xl'>
          Shipment Counts v/s (Origin , Destination)
        </h1>
        <div className='mx-5'>
          <div className='grid grid-cols-8 gap-y-4 bg-gray-200 font-medium mb-2 text-xl'>
            <h1>S.No</h1>
            <h1 className='col-span-3'>Origin </h1>
            <h1 className='col-span-3'>Destination</h1>
            <h1 className='col-span-1'>Count</h1>
          </div>

          {journey &&
            journey.map((item, i) => {
              return (
                <div className='grid grid-cols-8 gap-y-4 mb-1'>
                  <h1>{i + 1}</h1>
                  <h1 className='col-span-3'>{item.originName}</h1>
                  <h1 className='col-span-3'>{item.destination}</h1>
                  <h1 className='col-span-1'>{item.count}</h1>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Insight;
