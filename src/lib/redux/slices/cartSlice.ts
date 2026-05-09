import {
  createSlice,
  createSelector,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

type CartItem = {
  productId: string;
  title: string;
  image: { url: string; alt: string };
  price: number;
  discountedPrice: number;
  quantity: number;
};

type CartState = {
  items: Record<string, CartItem>;
};

const initialState: CartState = { items: {} };

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        productId: string;
        title: string;
        image: { url: string; alt: string };
        price: number;
        discountedPrice: number;
      }>,
    ) => {
      const { productId, title, image, price, discountedPrice } =
        action.payload;
      const existingItem = state.items[productId];

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items[productId] = {
          productId,
          title,
          image,
          quantity: 1,
          price,
          discountedPrice,
        };
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items[productId];
      if (!item) return;

      if (quantity <= 0) {
        delete state.items[productId];
      } else {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

const selectCartItemsMap = (state: RootState) => state.cart.items;

export const selectCartItemsArray = createSelector(
  [selectCartItemsMap],
  (itemsMap) => Object.values(itemsMap),
);

export const selectTotalCartQuantity = createSelector(
  [selectCartItemsArray],
  (itemsArray) => itemsArray.reduce((total, item) => total + item.quantity, 0),
);

export const selectTotalPrice = createSelector(
  [selectCartItemsArray],
  (itemsArray) =>
    itemsArray.reduce(
      (total, item) => total + item.quantity * item.discountedPrice,
      0,
    ),
);

export const selectTotalOriginalPrice = createSelector(
  [selectCartItemsArray],
  (itemsArray) =>
    itemsArray.reduce((total, item) => total + item.quantity * item.price, 0),
);

export const selectTotalDiscount = createSelector(
  [selectTotalOriginalPrice, selectTotalPrice],
  (original, discounted) => Math.max(original - discounted, 0),
);
