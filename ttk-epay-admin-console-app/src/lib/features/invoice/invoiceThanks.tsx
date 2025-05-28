import { createAsyncThunk } from "@reduxjs/toolkit";
import { invoiceList } from "./data";


export const fetchInvoice = createAsyncThunk(
    "invoice/getInvoices",
    async (_, thunkAPI) => {
      try {
        const response = { status: 200, data: invoiceList };
  
        if (response.status === 200) {
          return response.data; 
        } else {
          return thunkAPI.rejectWithValue("Failed to fetch invoices");
        }
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }  
  )

  