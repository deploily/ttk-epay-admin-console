import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientRegistration } from "../invoice/invoiceThunks";

export const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async (data: any, thunkAPI) => {
    const client = clientRegistration(thunkAPI)
    
    try {
      const payments = await client.getPayments({
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
    const client = clientRegistration(thunkAPI)
    try {
      const payment = await client.getPaymentById(paymentId);
      return payment;
    } catch (error: any) {
      console.error(`Error finding payment: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const savePdfReceipt = createAsyncThunk(
  "payment/savePdfReceipt",
  async (satimOrderId: string, thunkAPI) => {
    const client = clientRegistration(thunkAPI)

    try {
      const pdfData = await client.getPdfRecipt(satimOrderId); 

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






