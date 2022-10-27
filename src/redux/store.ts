import {combineReducers, configureStore} from "@reduxjs/toolkit";
import filterSlice from "./reducers/filterSlice";
import cartSlice from "./reducers/cartSlice";
import pizzasSlice from "./reducers/pizzasSlice";



const rootReducer = combineReducers({
    filter: filterSlice,
    cart: cartSlice,
    pizzas: pizzasSlice
})

export const store = configureStore({
    reducer: rootReducer
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch