import { createSlice } from "@reduxjs/toolkit";
import { fetchInvoice, generateLink, getInvoiceByOrderId } from "./invoiceThunks";
import { Invoice, InvoiceResponse } from "./invoiceInterface";

interface InvoiceState {
  invoiceList?: InvoiceResponse;
  isLoadingInvoiceList: boolean;
  invoiceListError?: any;
  invoice?: Invoice,
  isLoadingInvoice: boolean;
  invoiceError?: any;
  generatedLink?: string;
  isLoadingGenerateLink: boolean;
  generateLinkError?: any;

}

const initialState: InvoiceState = {
  invoiceList: undefined,
  isLoadingInvoiceList: false,
  invoiceListError: undefined,
  invoice: undefined,
  isLoadingInvoice: false,
  invoiceError: undefined,
  generatedLink: undefined,
  isLoadingGenerateLink: false,
  generateLinkError: undefined,

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
        state.invoiceListError = null;
        state.invoiceList = action.payload;

      })
      .addCase(fetchInvoice.rejected, (state, { payload }) => {
        state.isLoadingInvoiceList = false;
        state.invoiceListError = payload;
      })

      .addCase(getInvoiceByOrderId.pending, (state) => {
        state.isLoadingInvoice = true;
        state.invoiceError = null;
        state.invoice = undefined;
        return state;

      })
      .addCase(getInvoiceByOrderId.fulfilled, (state, action) => {

        state.isLoadingInvoice = false;
        state.invoiceError = null;
        state.invoice = action.payload;

        return state;

      })
      .addCase(getInvoiceByOrderId.rejected, (state, { payload }) => {
        state.isLoadingInvoice = false;
        state.invoiceError = payload;
        return state;

      })


      .addCase(generateLink.pending, (state) => {
        state.isLoadingGenerateLink = true;
        state.generateLinkError = null;
        state.generatedLink = undefined;
        return state;

      })
      .addCase(generateLink.fulfilled, (state, action) => {

        state.isLoadingGenerateLink = false;
        state.generateLinkError = null;
        state.generatedLink = action.payload;
        
        return state;

      })
      .addCase(generateLink.rejected, (state, { payload }) => {
        state.isLoadingGenerateLink = false;
        state.generateLinkError = payload;
        return state;

      })


  },
});
export default InvoiceSlice.reducer;
