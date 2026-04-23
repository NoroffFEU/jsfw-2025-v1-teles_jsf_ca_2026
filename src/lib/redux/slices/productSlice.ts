import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";
import type { Product } from "@/services/models/product";

type ProductState = {
  productsById: Record<string, Product>;
};

const initialState: ProductState = { productsById: {} };

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.productsById = action.payload.reduce<Record<string, Product>>(
        (acc, product) => {
          acc[product.id] = product;
          return acc;
        },
        {},
      );
    },
    clearProducts: (state) => {
      state.productsById = {};
    },
  },
});

export const { setProducts, clearProducts } = productSlice.actions;

export const selectProductsById = (state: RootState) =>
  state.products.productsById;

export default productSlice.reducer;
