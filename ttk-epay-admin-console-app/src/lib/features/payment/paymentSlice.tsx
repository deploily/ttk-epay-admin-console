import { createSlice } from "@reduxjs/toolkit";
import { Payment } from "./paymentInterface";
import { fetchPayment, getPaymentById } from "./paymentThunks";


interface PaymentState {
  paymentList?: Payment[];
  isLoadingPaymentList: boolean;
  paymentErrorList?: any;
  payment?: Payment,
  isLoadingPayment: boolean;
  paymentError?: any;


}

const initialState: PaymentState = {
  paymentList: undefined,
  isLoadingPaymentList: false,
  paymentErrorList: undefined,
  payment: undefined,
  isLoadingPayment: false,
  paymentError: undefined,

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


  },
});
export default PaymentSlice.reducer;
