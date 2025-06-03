import { createSlice } from "@reduxjs/toolkit";
import { fetchInvoice, getInvoiceById } from "./invoiceThunks";
import { Invoice } from "./invoiceInterface";

interface InvoiceState {
  invoiceList?: Invoice[];
  isLoadingInvoiceList: boolean;
  invoiceErrorList?: any;
  invoice?: Invoice,
  isLoadingInvoice: boolean;
  invoiceError?: any;


}

const initialState: InvoiceState = {
  invoiceList: undefined,
  isLoadingInvoiceList: false,
  invoiceErrorList: undefined,
  invoice: undefined,
  isLoadingInvoice: false,
  invoiceError: undefined,

};
const InvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoice.pending, (state) => {
        state.isLoadingInvoiceList = true;
      })
      .addCase(fetchInvoice.fulfilled, (state, action) => {
        state.isLoadingInvoiceList = false;
        state.invoiceErrorList = null;
        state.invoiceList = action.payload;

      })
      .addCase(fetchInvoice.rejected, (state, { payload }) => {
        state.isLoadingInvoiceList = false;
        state.invoiceErrorList = payload;
      })

      .addCase(getInvoiceById.pending, (state) => {
        state.isLoadingInvoice = true;
        state.invoiceError = null;
      })
      .addCase(getInvoiceById.fulfilled, (state, action) => {
        state.isLoadingInvoice = false;
        state.invoiceError = null;
        state.invoice = action.payload;

      })
      .addCase(getInvoiceById.rejected, (state, { payload }) => {
        state.isLoadingInvoice = false;
        state.invoiceError = payload;
      })


  },
});
export default InvoiceSlice.reducer;
