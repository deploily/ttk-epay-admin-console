import { createAsyncThunk } from "@reduxjs/toolkit";
import { payment } from "./data";
import { RootState } from "@/lib/store";
const { ttk_epay } = require('@deploily/ttk-epay-nodejs-client');


export const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async (data: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const client = new ttk_epay(state.registration.registration?.url);
    console.log("client=== ", client);
    
    try {
      const payments = await client.get_payments({
        pageNumber: data.numberPage,
        pageSize: data.pageSize,
        from_date: data.startDate,
        to_date: data.endDate
      });


      return payments;
    } catch (error: any) {
      console.error("Error fetching payments:", error);
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


export const savePdfReceipt = createAsyncThunk(
  "payment/savePdfReceipt",
  async (satimOrderId: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const client = new ttk_epay(state.registration.registration?.url);
    try {
      const pdfData = await client.get_pdf_recipt(satimOrderId); // Assure-toi que c’est un `Blob` ou `ArrayBuffer`

      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt_${satimOrderId}.pdf`;
      link.click();

      window.URL.revokeObjectURL(url);

      return "Downloaded successfully";
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);






