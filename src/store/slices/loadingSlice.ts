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
        .addMatcher(isRejected(),(state) => {
            state.loading = false
        })
})

const { reducer: LoadingReducer } = LoadingSlice
export {
    LoadingReducer
}