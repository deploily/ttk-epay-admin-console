import { createAsyncThunk } from "@reduxjs/toolkit";
import { Invoice } from "./invoiceInterface";
const { ttk_epay } = require('@deploily/ttk-epay-nodejs-client');
;
const client = new ttk_epay();

export const fetchInvoice = createAsyncThunk(
  "invoice/getInvoices",
  async (page: any, thunkAPI) => {

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
    // try {
    //   const response = { status: 200, data: invoice };

    //   if (response.status === 200) {
    //     return response.data;
    //   } else {
    //     return thunkAPI.rejectWithValue("Failed to get invoice");
    //   }
    // } catch (error: any) {
    //   return thunkAPI.rejectWithValue(error.message);
    // }

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
    try {
      const link = await client.generate_link('15', 15);
      return link

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }

  }
)

