import { login, setError } from "./authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../firebaseConfig";
import { getDatabase, ref, push, get } from "firebase/database";
import { setInvoicesByUser } from "./invoiceSlice";

export const authenticateUser = (credentials) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    console.log("Login successful", user);

    // Store the token and user info in sessionStorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("uid", user.uid);

    dispatch(login(user.id));
  } catch (error) {
    dispatch(setError("Failed to authenticate user."));
  }
};

export const setInvoiceByUserAsync = (userId) => async (dispatch) => {
  try {
    const db = getDatabase(app);
    const newDocRef = ref(db, `users/${userId}/invoices`);
    const snapshot = await get(newDocRef);

    if (snapshot.exists()) {
      const fetchedInvoices = snapshot.val();
      console.log("Dispatching setInvoiceByUser action:", fetchedInvoices);

      dispatch(setInvoicesByUser(fetchedInvoices));
    }
  } catch (error) {
    console.error("Error adding invoice:", error);
  }
};
