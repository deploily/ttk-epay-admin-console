import { createAsyncThunk } from "@reduxjs/toolkit";
import { payement, payementList } from "./data";


export const fetchPayement = createAsyncThunk(
  "payement/getpayements",
  async (_, thunkAPI) => {
    try {
      const response = { status: 200, data: payementList };

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to fetch payements");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const getPayementById = createAsyncThunk(
  "payement/getPayementById",
  async (payementId: string, thunkAPI) => {
    try {
      const response = { status: 200, data: payement };

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to get payement");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)


