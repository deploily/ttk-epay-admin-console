import { createSlice } from "@reduxjs/toolkit";
import { Payement } from "./payementInterface";
import { fetchPayement, getPayementById } from "./payementThanks";


interface PayementState {
  payementList?: Payement[];
  isLoadingPayementList: boolean;
  payementErrorList?: any;
  payement?: Payement,
  isLoadingPayement: boolean;
  payementError?: any;


}

const initialState: PayementState = {
  payementList: undefined,
  isLoadingPayementList: false,
  payementErrorList: undefined,
  payement: undefined,
  isLoadingPayement: false,
  payementError: undefined,
  
};
const PayementSlice = createSlice({
  name: "payement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayement.pending, (state) => {
        state.isLoadingPayementList = true;
      })
      .addCase(fetchPayement.fulfilled, (state, action) => {
        state.isLoadingPayementList = false;
        state.payementErrorList = null;
        state.payementList = action.payload;

      })
      .addCase(fetchPayement.rejected, (state, { payload }) => {
        state.isLoadingPayementList = false;
        state.payementErrorList = payload;
      })

     .addCase(getPayementById.pending, (state) => {
        state.isLoadingPayement = true;
        state.payementError = null;
      })
      .addCase(getPayementById.fulfilled, (state, action) => {
        state.isLoadingPayement = false;
        state.payementError = null;
        state.payement = action.payload;

      })
      .addCase(getPayementById.rejected, (state, { payload }) => {
        state.isLoadingPayement = false;
        state.payementError = payload;
      })
      

  },
});
export default PayementSlice.reducer;
