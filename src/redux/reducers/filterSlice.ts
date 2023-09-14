import {createSlice, PayloadAction } from "@reduxjs/toolkit"
import sort from "../../components/Sort";

export interface sortModel {
    name: string,
    sortProperty: 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title',
}

export interface filterState {
    categoryId: number,
    currentPage: number,
    selectedSort: sortModel,
    searchValue: string
}

const initialState: filterState = {
    categoryId: 0,
    currentPage: 1,
    selectedSort: {
        name: 'популярности по убыванию',
        sortProperty: 'rating'
    },
    searchValue: ''
}

const filterSlice = createSlice({

    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            console.log('action setCategoryId', action)
            state.categoryId = action.payload
        },
        setSelectedSort(state, action: PayloadAction<sortModel>) {
            state.selectedSort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<filterState>) {
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
            state.selectedSort = action.payload.selectedSort
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        }
    }
})

export const { setCategoryId, setSelectedSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer