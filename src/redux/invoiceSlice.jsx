import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: {},
  filteredInvoices: [],
  invoiceById: null,
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setInvoicesByUser: (state, action) => {
      state.invoices = action.payload;
    },
    filterInvoices: (state, action) => {
      // Get the filter criteria from the action payload
      const filterCriteria = action.payload;
      // Filter the invoices based on the status
      state.filteredInvoices = Object.values(state.invoices).filter(
        (invoice) => invoice.status === filterCriteria
      );
    },
    addInvoice: (state, action) => {
      // Store the invoice using the ID from the action payload as the key
      const invoice = action.payload; // Get the invoice from the action

      // Store the invoice using the ID as the key
      state.invoices[invoice.id] = invoice; // Use the invoice's id
    },
    // [todo] Get invoice by id
    getInvoiceById: (state, action) => {
      const { id } = action.payload;
      state.invoiceById = state.invoices[id] || null; // Assigning null if the invoice is not found
    },
    // [todo] deleteInvoice
    deleteInvoice: (state, action) => {
      const { id } = action.payload; // Destructure uiid from the action payload
      delete state.invoices[id]; // Delete the invoice using the uiid as the key
    },
    // [todo] updateInvoicestatus
    updateInvoiceStatus: (state, action) => {
      const { id, status } = action.payload;
      // Ensure immutability by creating a new invoice object
      if (state.invoices[id]) {
        state.invoices = {
          ...state.invoices,
          [id]: {
            ...state.invoices[id],
            status,
          },
        };
        console.log("statusChanged", state.invoices[id]);
      }
    },
    editInvoice: (state, action) => {
      const { id, ...updatedData } = action.payload;
      // Merge the updated data into existing invoice
      if (state.invoices[id]) {
        state.invoices[id] = {
          ...state.invoices[id],
          ...updatedData,
        };
      }
    },
  },
});

export const {
  setInvoicesByUser,
  filterInvoices,
  addInvoice,
  getInvoiceById,
  deleteInvoice,
  updateInvoiceStatus,
  editInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
