import { createSlice } from "@reduxjs/toolkit";

interface IState {
    
}

const initialState: IState = {
    
}
const LoadingSlice = createSlice({
    name: "Loading",
    initialState,
    reducers: {
        
    },
    extraReducers: builder => builder
})

const { reducer: LoadingReducer, actions } = LoadingSlice
const LoadingActions = { ...actions }
export {
    LoadingActions,
    LoadingReducer
}