import AppRoutes from "./components/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInvoiceByUserAsync } from "./redux/invoiceThunks";
import { login } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("uid");

  useEffect(() => {
    if (userId) {
      dispatch(login());
      dispatch(setInvoiceByUserAsync(userId));
    }
  }, [dispatch, userId]);

  return (
    <Router>
      <AppRoutes></AppRoutes>
    </Router>
  );
}

export default App;
