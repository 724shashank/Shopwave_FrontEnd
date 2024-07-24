// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import fetchProducts from "./slice/product";
import categoryView from "./slice/categoryProd";
import addToCart from "./slice/addToCart";
//import remove from "./slice/removeItem";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine reducers
const rootReducer = combineReducers({
  products: fetchProducts,
  category: categoryView,
  cart: addToCart,
//remove:remove,
});

// Configure persistReducer
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
