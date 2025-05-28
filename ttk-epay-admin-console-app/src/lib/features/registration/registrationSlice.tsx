import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Registration {
    url: string;
    secretKey: string;
}
interface RegistrationState {
    registration?: Registration
}

const initialState: RegistrationState = {
    registration: undefined,
 
};
const RegistrationSlice = createSlice({
  name: "Registration",
  initialState,
  reducers: {
    setRegistration:(state, action:PayloadAction<Registration | undefined>)=>{
        state.registration = action.payload  
    },
    
    removeRegistration:(state)=>{
        state.registration = undefined  
        
    }
  },
  extraReducers: (builder) => {
    builder
      
  },
});
export const { setRegistration, removeRegistration } = RegistrationSlice.actions;

export default RegistrationSlice.reducer;




