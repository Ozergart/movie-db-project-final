import {createSlice} from "@reduxjs/toolkit";
import {IMovie, IMovieRes} from "../../interfaces";

interface IState  {
    answer:IMovie
    Movies:IMovieRes
}

const initialState:IState = {
    answer:null,
    Movies:[]
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