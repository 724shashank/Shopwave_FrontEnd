// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import view_Products from "./slice/product";
import categoryView from "./slice/categoryProd";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine reducers
const rootReducer = combineReducers({
  products: view_Products,
  category: categoryView,
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
