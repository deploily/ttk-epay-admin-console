import { configureStore } from "@reduxjs/toolkit";
import RegistrationSlice from './features/registration/registrationSlice'
import InvoiceSlice from './features/invoice/invoiceSlice'
import PayementSlice from './features/payement/payementSlice'
import ClaimSlice from './features/claim/claimSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        registration: RegistrationSlice,
        invoice: InvoiceSlice,
        payement: PayementSlice,
        claim: ClaimSlice
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
