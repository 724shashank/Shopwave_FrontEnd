import { configureStore, combineReducers } from "@reduxjs/toolkit";
import fetchProducts from "./slice/product";
import categoryView from "./slice/categoryProd";
import cartDetail from "./slice/cartDetails";
import listProducts from "./slice/listProducts";
import searchSlice from "./slice/search";  // Corrected import name
import login from "./slice/auth";
import fetchUser from "./slice/userDetails";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine reducers
const rootReducer = combineReducers({
  products: fetchProducts,
  category: categoryView,
  cartDetail: cartDetail,
  login: login,
  userDetail: fetchUser,
  listProducts: listProducts,
  searchProducts: searchSlice  // Consistent key name for clarity
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
