import { createSlice } from "@reduxjs/toolkit";
import { Payment, PaymentResponse } from "./paymentInterface";
import { fetchPayment, getPaymentById, savePdfReceipt } from "./paymentThunks";


interface PaymentState {
  paymentList?: PaymentResponse;
  isLoadingPaymentList: boolean;
  paymentErrorList?: any;
  payment?: Payment,
  isLoadingPayment: boolean;
  paymentError?: any;
  pdfReceipt?: any;
  isLoadingPdfReceipt?: boolean;
  pdfReceiptError?: any;



}

const initialState: PaymentState = {
  paymentList: undefined,
  isLoadingPaymentList: false,
  paymentErrorList: undefined,
  payment: undefined,
  isLoadingPayment: false,
  paymentError: undefined,
  pdfReceipt: undefined,
  isLoadingPdfReceipt: false,
  pdfReceiptError: undefined,

};
const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayment.pending, (state) => {
        state.isLoadingPaymentList = true;
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.isLoadingPaymentList = false;
        state.paymentErrorList = null;
        state.paymentList = action.payload;

      })
      .addCase(fetchPayment.rejected, (state, { payload }) => {
        state.isLoadingPaymentList = false;
        state.paymentErrorList = payload;
      })

      .addCase(getPaymentById.pending, (state) => {
        state.isLoadingPayment = true;
        state.paymentError = null;
      })
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.isLoadingPayment = false;
        state.paymentError = null;
        state.payment = action.payload;

      })
      .addCase(getPaymentById.rejected, (state, { payload }) => {
        state.isLoadingPayment = false;
        state.paymentError = payload;
      })
      
      .addCase(savePdfReceipt.pending, (state) => {
        state.isLoadingPdfReceipt = true;
        state.pdfReceiptError = null;
        return state
      })
      .addCase(savePdfReceipt.fulfilled, (state, action) => {
        state.isLoadingPdfReceipt = false;
        state.pdfReceiptError = null;
        state.pdfReceipt = action.payload;
        return state

      })
      .addCase(savePdfReceipt.rejected, (state, { payload }) => {
        state.isLoadingPdfReceipt = false;
        state.pdfReceiptError = payload;
        return state
      })


  },
});
export default PaymentSlice.reducer;
