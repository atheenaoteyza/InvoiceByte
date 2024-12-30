import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import invoiceReducer from "./invoiceSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: invoiceReducer,
  },
});
