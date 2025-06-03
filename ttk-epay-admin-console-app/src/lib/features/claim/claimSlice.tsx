import { createSlice } from "@reduxjs/toolkit";
import { Claim } from "./claimInterface";
import { fetchClaim, getClaimById } from "./claimThunks";



interface ClaimState {
  claimList?: Claim[];
  isLoadingClaimList: boolean;
  claimErrorList?: any;
  claim?: Claim,
  isLoadingClaim: boolean;
  claimError?: any;


}

const initialState: ClaimState = {
  claimList: undefined,
  isLoadingClaimList: false,
  claimErrorList: undefined,
  claim: undefined,
  isLoadingClaim: false,
  claimError: undefined,

};
const ClaimSlice = createSlice({
  name: "claim",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClaim.pending, (state) => {
        state.isLoadingClaimList = true;
      })
      .addCase(fetchClaim.fulfilled, (state, action) => {
        state.isLoadingClaimList = false;
        state.claimErrorList = null;
        state.claimList = action.payload;

      })
      .addCase(fetchClaim.rejected, (state, { payload }) => {
        state.isLoadingClaimList = false;
        state.claimErrorList = payload;
      })

      .addCase(getClaimById.pending, (state) => {
        state.isLoadingClaim = true;
        state.claimError = null;
      })
      .addCase(getClaimById.fulfilled, (state, action) => {
        state.isLoadingClaim = false;
        state.claimError = null;
        state.claim = action.payload;

      })
      .addCase(getClaimById.rejected, (state, { payload }) => {
        state.isLoadingClaim = false;
        state.claimError = payload;
      })


  },
});
export default ClaimSlice.reducer;
