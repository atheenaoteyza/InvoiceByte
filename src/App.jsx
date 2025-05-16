import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceByUserAsync,
  updateInvoiceAsync,
} from "./redux/invoiceThunks";
import { login, setAsGuest } from "./redux/authSlice";
import { setInvoicesByUser } from "./redux/invoiceSlice";
import { useNavigate } from "react-router-dom";
import mockInvoices from "./components/functions/MockInvoices";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("uid");
  const invoices = useSelector((state) => state.invoices.invoices);
  const navigate = useNavigate();
  const { isGuest } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId) {
      dispatch(login());
      dispatch(setInvoiceByUserAsync(userId));
    } else {
      dispatch(setAsGuest());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (invoices && userId) {
      const updateInvoices = async () => {
        try {
          await dispatch(updateInvoiceAsync(invoices, userId));
        } catch (error) {
          console.error("error update:", error);
        }
      };

      updateInvoices();
    }
  }, [invoices, dispatch, userId]);

  useEffect(() => {
    if (isGuest) {
      dispatch(setInvoicesByUser(mockInvoices));
    }
  }, [dispatch, isGuest]);

  return (
    <div>
      <Analytics />
    </div>
  );
}

export default App;
