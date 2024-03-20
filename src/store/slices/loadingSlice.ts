import {createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";

interface IState {
    loading:boolean
}

const initialState: IState = {
    loading:null
}
const LoadingSlice = createSlice({
    name: "Loading",
    initialState,
    reducers: {
        
    },
    extraReducers: builder => builder
        .addMatcher(isFulfilled(),(state, action) => {
            console.log(action.payload);
            state.loading = false
        })
        .addMatcher(isPending(), (state,action) => {
            console.log(action.payload);
            state.loading = true
        })
        .addMatcher(isRejected(),(state,action) => {
            console.log(action.payload);
            state.loading = false
        })
})

const { reducer: LoadingReducer, actions } = LoadingSlice
const LoadingActions = { ...actions }
export {
    LoadingActions,
    LoadingReducer
}