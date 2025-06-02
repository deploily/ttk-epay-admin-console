import { configureStore } from "@reduxjs/toolkit";
import RegistrationSlice from './features/registration/registrationSlice'
import InvoiceSlice from './features/invoice/invoiceSlice'
import PayementSlice from './features/payement/payementSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        registration: RegistrationSlice,
        invoice: InvoiceSlice,
        payement: PayementSlice,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
