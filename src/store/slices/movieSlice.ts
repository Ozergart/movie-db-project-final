import {createAsyncThunk, createSlice, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovie, IMovieRes} from "../../interfaces";
import {movieDBServices} from "../../services/movieDBServices";


interface IState  {
    answer:IMovie
    Movies:IMovieRes[]
    error:string
}

const initialState:IState = {
    answer:{page:null,total_pages:null,total_results:null},
    Movies:[],
    error:''
}
const getAll = createAsyncThunk<IMovie,void>(
    "movieSlice/getAll",
    async (_,{rejectWithValue})=>{
        try {
            const {data} =  await movieDBServices.getAll()
            return  data

        }catch (e) {
            const err = e as AxiosError
            return  rejectWithValue(err.response.data)
        }
    }
)
const movieSlice = createSlice({
    name:'movieSlice',
    initialState,
    reducers:{

    },
    extraReducers:builder => builder
        .addCase(getAll.fulfilled,(state, action) => {
            state.answer = action.payload
            state.Movies = action.payload.results
        })
        .addMatcher(isRejected(getAll),(state, action) => {
            state.error = "Помишка у пошуку"
        })
})
const {reducer:MovieReducer,actions} = movieSlice
const MovieActions = {...actions, getAll}
export {
    MovieActions,
    MovieReducer
}