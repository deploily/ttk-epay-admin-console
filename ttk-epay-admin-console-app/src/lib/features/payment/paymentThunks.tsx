import { createAsyncThunk } from "@reduxjs/toolkit";
import { payment, paymentList } from "./data";
const { ttk_epay } = require('@deploily/ttk-epay-nodejs-client');


export const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async (data:any, thunkAPI) => {
    const endDate = new Date().toISOString();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    
    try {
      // Fetching payments from the last 30 days
      const payments = await client.get_payments({
        pageSize: data.pageSize,
        from_date: data.startDate,
        to_date: data.endDate
      });

      // Assuming 'payments' is an array or object with a 'payments' field
      
      return payments;
    } catch (error) {
      console.error("Error fetching payments:", error);
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

const client = new ttk_epay();





