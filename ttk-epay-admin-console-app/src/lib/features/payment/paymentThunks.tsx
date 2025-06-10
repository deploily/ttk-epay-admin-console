import { createAsyncThunk } from "@reduxjs/toolkit";
import { payment } from "./data";
const { ttk_epay } = require('@deploily/ttk-epay-nodejs-client');
const client = new ttk_epay();
// const fs = require('fs-extra')


export const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async (data: any, thunkAPI) => {

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
    try {
      const pdfData = await client.get_pdf_recipt(satimOrderId);
      // fs.writeFileSync(`receipt_${satimOrderId}.pdf`, pdfData);
      return pdfData;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)






