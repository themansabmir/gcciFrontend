import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from '../features/employeeSlice'
import rolesReducer from '../features/rolesSlice'
import portReducer from '../features/portSlice'
import currencyReducer from "../features/currencySlice";
import addressReducer from "../features/addressSlice";
const store = configureStore({
  reducer: {
    employee: employeeReducer,
    roles: rolesReducer,
    port: portReducer,
    currency: currencyReducer,
    address: addressReducer
  },
});

export default store;
