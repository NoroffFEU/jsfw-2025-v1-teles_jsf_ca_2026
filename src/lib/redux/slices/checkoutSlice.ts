import {
  createSlice,
  createSelector,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";
import { DeliveryOptions, PaymentOptions } from "@/lib/data";

export type DeliveryMethod = keyof typeof DeliveryOptions;
export type PaymentMethod = keyof typeof PaymentOptions;
type CheckoutState = {
  selectedDelivery: DeliveryMethod | null;
  selectedPayment: PaymentMethod | null;
};

const initialState: CheckoutState = {
  selectedDelivery: "box",
  selectedPayment: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,

  reducers: {
    setSelectedDelivery: (state, action: PayloadAction<DeliveryMethod>) => {
      state.selectedDelivery = action.payload;
    },
    setSelectedPayment: (state, action: PayloadAction<PaymentMethod>) => {
      state.selectedPayment = action.payload;
    },
    resetCheckoutSelection: (state) => {
      state.selectedDelivery = "box";
      state.selectedPayment = null;
    },
  },
});

export const {
  setSelectedDelivery,
  setSelectedPayment,
  resetCheckoutSelection,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

const selectCheckout = (state: RootState) => state.checkout;

export const selectSelectedDelivery = createSelector(
  [selectCheckout],
  (checkout) => checkout.selectedDelivery,
);

export const selectSelectedPayment = createSelector(
  [selectCheckout],
  (checkout) => checkout.selectedPayment,
);

export const selectSelectedDeliveryFee = createSelector(
  [selectSelectedDelivery],
  (delivery) => (delivery ? DeliveryOptions[delivery].price : 0),
);
