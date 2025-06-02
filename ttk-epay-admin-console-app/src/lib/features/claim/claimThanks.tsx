import { createAsyncThunk } from "@reduxjs/toolkit";
import { claim, claimList } from "./data";



export const fetchClaim = createAsyncThunk(
  "claim/getClaim",
  async (_, thunkAPI) => {
    try {
      const response = { status: 200, data: claimList };

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to fetch claim");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const getClaimById = createAsyncThunk(
  "claim/getClaimById",
  async (claimId: string, thunkAPI) => {
    try {
      const response = { status: 200, data: claim };

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to get claim");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)


