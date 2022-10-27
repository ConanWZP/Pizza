import {createSlice, PayloadAction } from "@reduxjs/toolkit"
import sort from "../../components/Sort";
import {typePizzaObject} from "../../components/PizzaBlock/PizzaBlock";
import {log} from "util";
import {RootState} from "../store";
import {IPizza} from "../../types/IPizza";
import {getCartLocalStorage} from "../../utils/getCartLocalStorage";
import { calcTotalPrice } from "../../utils/calcTotalPrice";



export interface cartState {
    totalPrice: number,
    items: typePizzaObject[],
}
const dataForInitialState = getCartLocalStorage()
console.log(dataForInitialState)
const initialState: cartState = {
    //totalPrice: 0,
    //items: [],
    totalPrice: calcTotalPrice(dataForInitialState),
    items: getCartLocalStorage()
}

const cartSlice = createSlice({

    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<typePizzaObject>) {
            //const newItems = [...state.items, action.payload]
            const findItem = state.items.find(item => item.id === action.payload.id)
            if (findItem && findItem.count) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            const initialValue = 0
            state.totalPrice = state.items.reduce((previousValue, currentValue) => {
                //console.log('Пред знач', previousValue, `|||Текущее знач`, currentValue)
                return previousValue + (currentValue.price*currentValue.count)
            }, initialValue)
        },
        minusPizza(state, action: PayloadAction<string>) {
            const findItem = state.items.find(item => item.id === action.payload)
            if (findItem) {
                findItem.count--
            }
            state.totalPrice = state.items.reduce((previousValue, currentValue) => {
                return previousValue + (currentValue.price*currentValue.count)
            }, 0)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload)
            state.totalPrice = state.items.reduce((previousValue, currentValue) => {
                return previousValue + (currentValue.price*currentValue.count)
            }, 0)
        },
        clearItem(state) {
            state.items = []
            state.totalPrice = 0
        },
    }
})

export const cartSelector = (state: RootState) => state.cart
export const cartSelectorById = (id: string) => (state: RootState) => state.cart.items.find(item => item.id === id)

export const { addItem, removeItem, clearItem, minusPizza } = cartSlice.actions

export default cartSlice.reducer