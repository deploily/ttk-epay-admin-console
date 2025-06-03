import { createAsyncThunk } from "@reduxjs/toolkit";
import { payment, paymentList } from "./data";


export const fetchPayment = createAsyncThunk(
  "payment/getPayments",
  async (_, thunkAPI) => {
    try {
      const response = { status: 200, data: paymentList };

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to fetch payments");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const getPaymentById = createAsyncThunk(
  "payment/getPaymentById",
  async (paymentId: string, thunkAPI) => {
    try {
      const response = { status: 200, data: payment };

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to get payment");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)


