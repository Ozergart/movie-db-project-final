import { createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";

import {MovieActions} from "./movieSlice";

interface IState {
    loading:boolean
}

const initialState: IState = {
    loading:false
}
const LoadingSlice = createSlice({
    name: "Loading",
    initialState,
    reducers: {
        
    },
    extraReducers: builder => builder
        .addMatcher(isFulfilled(),(state) => {
            state.loading = false
        })
        .addMatcher(isPending(), (state,action) => {
            state.loading = action.type !== MovieActions.moviesFastSearch.pending.type;
        })
        .addMatcher(isRejected(),(state,action) => {
            state.loading = false
            console.log('error')
            console.log(action.payload)
        })
})

const { reducer: LoadingReducer } = LoadingSlice
export {
    LoadingReducer
}