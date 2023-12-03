import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employeeSlice";
import rolesReducer from "../features/rolesSlice";
import portReducer from "../features/portSlice";
import currencyReducer from "../features/currencySlice";
import addressReducer from "../features/addressSlice";
import customerReducer from "../features/customerSlice";
import mblReducer from "../features/mblSlice";
import hblReducer from "../features/hblSlice";
import shipmentSlice from "../features/shipmentSlice";
import taskSlice from "../features/taskSlice";
import dashboardReducer from "../features/dashboardSlice";
import insightReducer from "../features/insightSlice";
const store = configureStore({
  reducer: {
    mbl: mblReducer,
    employee: employeeReducer,
    roles: rolesReducer,
    port: portReducer,
    currency: currencyReducer,
    address: addressReducer,
    customer: customerReducer,
    hbl: hblReducer,
    shipment: shipmentSlice,
    task: taskSlice,
    dashboard: dashboardReducer,
    insight: insightReducer,
  },
});

export default store;
