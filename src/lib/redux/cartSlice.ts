import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem: (state, action) => {
      const { productId } = action.payload;
      const existingItem = state.items[productId];

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items[productId] = { ...action.payload, quantity: 1 };
      }
    },

    removeItem: (state, action) => {
      const productId = action.payload;
      delete state.items[productId];
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items[productId];

      if (item) {
        if (quantity <= 0) {
          delete state.items[productId];
        } else {
          item.quantity = quantity;
        }
      }
      // item doesn't exist, tell the user?
    },

    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// selectors
const selectCartItemsMap = (state) => state.cart.items;

export const selectCartItemsArray = createSelector(
  [selectCartItemsMap],
  (itemsMap) => Object.values(itemsMap),
);

export const selectTotalCartQuantity = createSelector(
  [selectCartItemsArray],
  (itemsArray) => itemsArray.reduce((total, item) => total + item.quantity, 0),
);
