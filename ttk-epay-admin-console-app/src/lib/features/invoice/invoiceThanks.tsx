import { createAsyncThunk } from "@reduxjs/toolkit";
import { invoice, invoiceList } from "./data";


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

export const getInvoiceById = createAsyncThunk(
  "invoice/getInvoiceById",
  async (invoiceId: string, thunkAPI) => {
    try {
      const response = { status: 200, data: invoice };

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to get invoice");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
export const updateInvoice = createAsyncThunk(
  "invoice/updateInvoice",
  async (data: any, thunkAPI) => {
    try {
      
      const response = { status: 200, id: data.id, data: data };

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to update invoice");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
export const postInvoice = createAsyncThunk(
  "invoice/postInvoice",
  async (data: any, thunkAPI) => {
    try {
      
      const response = { status: 200,  data: data };

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to post a invoice");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

