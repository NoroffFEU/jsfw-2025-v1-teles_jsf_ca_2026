import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slices/countSlice";
import cartReducer from "./slices/cartSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/es/storage";

const rootReducer = combineReducers({
  counter: counterReducer,
  cart: cartReducer,
  // products: productReducer
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart"],
  // blacklist: ["reducer-to-blacklist"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
