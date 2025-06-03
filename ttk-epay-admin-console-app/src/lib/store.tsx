import { configureStore } from "@reduxjs/toolkit";
import RegistrationSlice from './features/registration/registrationSlice'
import InvoiceSlice from './features/invoice/invoiceSlice'
import PaymentSlice from './features/payment/paymentSlice'
import ClaimSlice from './features/claim/claimSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      registration: RegistrationSlice,
      invoice: InvoiceSlice,
      payment: PaymentSlice,
      claim: ClaimSlice
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
