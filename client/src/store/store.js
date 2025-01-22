import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from './admin/products-slice'
import shopProductsSlice from "./shop/products-slice/index"
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice";
import shoppingOrderSlice from "./order-slice";


const store = configureStore({
    reducer:{
        auth:authReducer,
        adminProducts : adminProductsSlice,
        shopProducts: shopProductsSlice, 
        shopCart: shopCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder : shoppingOrderSlice,
    },  
});

export default store;