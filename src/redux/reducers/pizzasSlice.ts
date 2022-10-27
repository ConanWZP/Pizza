import {createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import {CountAndPizzas, IPizza} from "../../types/IPizza";
import {StatusEnum} from "../../types/Nums";


export interface pizzasSlice {
    pizzas: IPizza[],
    status: StatusEnum
    countPizzas: number,
    totalPages: number
}

const initialState: pizzasSlice = {
    pizzas: [],
    status: StatusEnum.LOADING, // loading | success | error
    countPizzas: 0,
    totalPages: 0
}

export interface getPizzasApi {
    limit: number
    sortBy: string,
    order: string,
    category: string,
    search: string,
    currentPage: number
}

export const takePizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async (params: getPizzasApi, thunkAPI) => {
        const {limit, search, order, category, sortBy, currentPage} = params
        const getPizzas = await axios.get<CountAndPizzas>(`https://63413b5520f1f9d7996e8f99.mockapi.io/items?limit=${limit}&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}&${search}`)
        thunkAPI.dispatch(setPizzas(getPizzas.data.items)) // позволяет не использовать строчку в [takePizzas.fulfilled.type], а именно state.pizzas = action.payload.items
        const pages = Math.ceil(getPizzas.data.count/limit)
        thunkAPI.dispatch(setTotalPages(pages))
        return getPizzas.data
    }
)

/*export const takePizzasOld = (params) => {
    return async (dispatch) => {
        const {limit, search, order} = params
        const tt = await axios.get(`sdgdfghdf?limit=${limit}`)
        //dispatch(setPizzas(tt.data))
    }
}*/

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<any>) {
            console.log(action.payload)
            state.pizzas = action.payload
        },
        setTotalPages(state, action: PayloadAction<number>) {
            state.totalPages = action.payload
        }
    },
    extraReducers: {
        [takePizzas.pending.type]: (state) => {
            state.status = StatusEnum.LOADING
            state.pizzas = []
        },
        [takePizzas.fulfilled.type]: (state, action: PayloadAction<CountAndPizzas>) => {
            console.log(action)
            //state.pizzas = action.payload.items
            state.countPizzas = action.payload.count
            state.status = StatusEnum.SUCCESS
        },
        [takePizzas.rejected.type]: (state, action: PayloadAction<string>) => {
            console.log('Произошла ошибка')
            state.status = StatusEnum.ERROR
            state.pizzas = []
        },
    }
})

export const { setPizzas, setTotalPages } = pizzasSlice.actions

export default pizzasSlice.reducer