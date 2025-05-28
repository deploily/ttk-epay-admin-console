import { configureStore } from "@reduxjs/toolkit";
import RegistrationSlice from './features/registration/registrationSlice'
import InvoiceSlice from './features/invoice/invoiceSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        registration: RegistrationSlice,
        invoice: InvoiceSlice,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
