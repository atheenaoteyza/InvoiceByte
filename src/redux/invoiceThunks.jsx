import { login, setError } from "./authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../firebaseConfig";
import { getDatabase, ref, push, get, update } from "firebase/database";
import { setInvoicesByUser, addInvoice, editInvoice } from "./invoiceSlice";
import { v4 as uuidv4 } from "uuid";
import getPaymentDue from "../components/functions/getPaymentDue";

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

export const addInvoiceOptimistically =
  (invoice, userId) => async (dispatch) => {
    try {
      const shortId = uuidv4().split("-")[0].slice(0, 4);
      const uiid = `${userId.slice(0, 6)}_${shortId}`;
      const createdAt =
        invoice.createdAt || new Date().toISOString().split("T")[0];
      const paymentTerms = parseFloat(invoice.paymentTerms);
      // Make sure `items` is a proper array with valid data
      const items =
        Array.isArray(invoice.items) && invoice.items.length > 0
          ? invoice.items.map((item) => {
              return {
                name: item.name || "Unnamed Item", // Use the item's name or a default if missing
                quantity: parseFloat(item.quantity) || 1, // Convert quantity to a number or default to 1
                price: parseFloat(item.price) || 0, // Convert price to a number or default to 0
                total:
                  (parseFloat(item.price) || 0) *
                  (parseFloat(item.quantity) || 1), // Calculate total
              };
            })
          : [
              {
                name: "Item 1", // Default item name
                quantity: 1, // Default quantity
                price: 20, // Default price
                total: 20, // Default total
              },
            ];

      // Calculate total from the items

      const total = items.reduce(
        (acc, item) => acc + parseFloat(item.price) * parseFloat(item.quantity),
        0
      );

      const newInvoice = {
        id: invoice.id || uiid, // Use uiid if invoice.id is null or undefined
        createdAt: createdAt,
        paymentDue: getPaymentDue(createdAt, paymentTerms),
        description: invoice.description,
        paymentTerms: invoice.paymentTerms,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        status: invoice.status || "pending",
        senderAddress: {
          street: invoice.senderStreet,
          city: invoice.senderCity,
          postCode: invoice.senderPostCode,
          country: invoice.senderCountry,
        },
        clientAddress: {
          street: invoice.clientStreet,
          city: invoice.clientCity,
          postCode: invoice.clientPostCode,
          country: invoice.clientCountry,
        },
        items: items,
        total: total,
      };

      if (invoice.id) {
        console.log("this is for edit", newInvoice);
        dispatch(editInvoice(newInvoice));
        console.log("Success!! edited invoice:", newInvoice);
      } else {
        //Dispatch the invoice to Redux
        dispatch(addInvoice(newInvoice));
        console.log("Optimistically added invoice:", newInvoice);
      }

      // Optionally: Log the invoice to ensure it's correctly created
    } catch (error) {
      console.error("Error adding invoice:", error);
      // Optionally dispatch a failure action to indicate error in creating invoice
      // dispatch(addInvoiceError(error));
    }
  };

export const updateInvoiceAsync =
  (updatedInvoices, userId) => async (dispatch, getState) => {
    const { isGuest } = getState().auth;
    if (isGuest) {
      return;
    }

    try {
      const db = getDatabase(app);

      // Get current user's invoices
      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);
      const oldInvoices = snapshot.val()?.invoices || {};

      // Merge updated with old invoices
      const invoices = Object.keys(updatedInvoices).reduce((acc, key) => {
        acc[key] = updatedInvoices[key]; // Add/overwrite with updatedInvoices
        return acc;
      }, {});

      Object.keys(oldInvoices).forEach((key) => {
        if (!(key in updatedInvoices)) {
          delete invoices[key]; // Remove old invoices not in updatedInvoices
        }
      });
      console.log("Sending updated invoices...");

      // Update the user's invoices in Firebase
      await update(userRef, { invoices });
      console.log("Invoices updated successfully", invoices);
    } catch (error) {
      console.error("Error updating invoices", error);
    }
  };
