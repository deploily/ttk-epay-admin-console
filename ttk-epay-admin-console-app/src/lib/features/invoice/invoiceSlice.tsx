import { createSlice } from "@reduxjs/toolkit";
import { fetchInvoice } from "./invoiceThanks";
import { Invoice } from "./invoiceInterface";

interface InvoiceState {
  invoiceList?: Invoice[];
  isLoadingInvoice: boolean;
  invoiceError?: any;


}

const initialState: InvoiceState = {
  invoiceList: undefined,
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
        state.isLoadingInvoice = true;
      })
      .addCase(fetchInvoice.fulfilled, (state, action) => {
        state.isLoadingInvoice = false;
        state.invoiceError = null;
        state.invoiceList = action.payload;

      })
      .addCase(fetchInvoice.rejected, (state, { payload }) => {
        state.isLoadingInvoice = false;
        state.invoiceError = payload;
      })
      

  },
});
export default InvoiceSlice.reducer;
