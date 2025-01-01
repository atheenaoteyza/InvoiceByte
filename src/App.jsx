import AppRoutes from "./components/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceByUserAsync,
  updateInvoiceAsync,
} from "./redux/invoiceThunks";
import { login } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("uid");
  const invoices = useSelector((state) => state.invoices.invoices);

  useEffect(() => {
    if (userId) {
      dispatch(login());
      dispatch(setInvoiceByUserAsync(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (invoices && userId) {
      // Call updateInvoiceAsync when invoices changes
      const updateInvoices = async () => {
        try {
          // Dispatch the async action to update invoices
          await dispatch(updateInvoiceAsync(invoices, userId));
        } catch (error) {
          // Dispatch an error message if something goes wrong
          console.error("error update :", error);
        }
      };

      updateInvoices(); // Trigger the async function
    }
  }, [invoices, dispatch, userId]); // Dependencies to trigger the effect
  return (
    <Router>
      <AppRoutes></AppRoutes>
    </Router>
  );
}

export default App;
