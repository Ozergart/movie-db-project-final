import {createSlice} from "@reduxjs/toolkit";

interface IState  {

}

const initialState:IState = {

}

const movieSlice = createSlice({
    name:'movieSlice',
    initialState,
    reducers:{

    },
    extraReducers:builder => builder
})
const {reducer:MovieReducer,actions} = movieSlice
const MovieActions = {...actions}
export {
    MovieActions,
    MovieReducer
}