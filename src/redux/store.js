import { configureStore } from "@reduxjs/toolkit";
import view_Products from "./slice/product";
import categoryView from "./slice/categoryProd";
  
export const store = configureStore({
    reducer:{
        products: view_Products,
        categoryView: categoryView,
    },
});