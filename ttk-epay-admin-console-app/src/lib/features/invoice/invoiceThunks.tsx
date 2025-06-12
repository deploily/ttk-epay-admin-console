import { createAsyncThunk } from "@reduxjs/toolkit";
import { Invoice } from "./invoiceInterface";
import { RootState } from "@/lib/store";
const { ttk_epay } = require('@deploily/ttk-epay-nodejs-client');

export const fetchInvoice = createAsyncThunk(
  "invoice/getInvoices",
  async (page: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const client = new ttk_epay(state.registration.registration?.url);
    try {
      const response = await client.get_invoices(page.numberPage, page.pageSize);
      return response;
    } catch (error: any) {
      console.error('Error fetching invoices:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }

  }
)

export const getInvoiceByOrderId = createAsyncThunk(
  "invoice/getInvoiceByOrderId",
  async (invoiceOrederId: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const client = new ttk_epay(state.registration.registration?.url);

    try {
      const invoice = await client.get_invoice_by_order_id(invoiceOrederId);
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
    const client = new ttk_epay(state.registration.registration?.url);
    try {
      const result = await client.update_invoice(data.ID, data);

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
    const client = new ttk_epay(state.registration.registration?.url);
    try {
      const createdInvoice = await client.create_invoice(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const generateLink = createAsyncThunk(
  "invoice/generateLink",
  async (data: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState 
    const client = new ttk_epay(state.registration.registration?.url);
    
    try {
      const link = await client.generate_link(data.orderId, data.clientCode);
      return link

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }

  }
)

