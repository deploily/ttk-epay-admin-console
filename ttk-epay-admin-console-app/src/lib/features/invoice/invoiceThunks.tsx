import { createAsyncThunk } from "@reduxjs/toolkit";
import { Invoice } from "./invoiceInterface";
import { RootState } from "@/lib/store";
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client');

export const fetchInvoice = createAsyncThunk(
  "invoice/getInvoices",
  async (page: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const client = new TtkEpay(state.registration.registration?.url);
    try {
      const response = await client.getInvoices(page.numberPage, page.pageSize);
      return response;
    } catch (error: any) {
      console.error('Error fetching invoices:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }

  }
)

export const getInvoiceById = createAsyncThunk(
  "invoice/getInvoiceById",
  async (invoiceId: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const client = new TtkEpay(state.registration.registration?.url);

    try {
      const invoice = await client.getInvoiceById(invoiceId);
      return invoice;
    } catch (error: any) {
      console.error(`Error finding invoice: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
export const updateInvoice = createAsyncThunk(
  "invoice/updateInvoice",
  async (data: Invoice, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const client = new TtkEpay(state.registration.registration?.url);
    try {
      const result = await client.updateInvoice(data.ID, data);

      return result;
    } catch (error: any) {
      console.error(`Update failed: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const postInvoice = createAsyncThunk(
  "invoice/postInvoice",
  async (data: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState 
    const client = new TtkEpay(state.registration.registration?.url);
    try {
      const createdInvoice = await client.createInvoice(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const generateLink = createAsyncThunk(
  "invoice/generateLink",
  async (data: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState 
    const client = new TtkEpay(state.registration.registration?.url);
    
    try {
      const link = await client.generateLink(data.orderId, data.clientCode);
      return link

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }

  }
)

