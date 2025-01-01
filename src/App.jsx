import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceByUserAsync,
  updateInvoiceAsync,
} from "./redux/invoiceThunks";
import { login } from "./redux/authSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("uid");
  const invoices = useSelector((state) => state.invoices.invoices);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(login());
      dispatch(setInvoiceByUserAsync(userId));
    } else {
      navigate("/login");
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
}

export default App;
