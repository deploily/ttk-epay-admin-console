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
    setRegistration: (state, action: PayloadAction<Registration | undefined>) => {
      localStorage.setItem('registration', JSON.stringify(action.payload));
      const registrationStorage = localStorage.getItem('registration') as string;
      state.registration = JSON.parse(registrationStorage);
    },

    getRegistration: (state) => {
      const registrationStorage = localStorage.getItem('registration') as string;      
      state.registration = JSON.parse(registrationStorage);

    }
  },
  extraReducers: (builder) => {
    builder

  },
});
export const { setRegistration, getRegistration } = RegistrationSlice.actions;

export default RegistrationSlice.reducer;




