import {createAsyncThunk, createSlice, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovie, IMovieRes} from "../../interfaces";
import {movieDBServices} from "../../services";


interface IState  {
    answer:IMovie
    Movies:IMovieRes[]
    error:string
    fastSearch:string
    moviesSearch:IMovieRes[]
}

const initialState:IState = {
    answer:{page:null,total_pages:null,total_results:null},
    Movies:[],
    error:'',
    fastSearch:'',
    moviesSearch:[]
}
const getAll = createAsyncThunk<IMovie,void>(
    "movieSlice/getAll",
    async (_,{rejectWithValue})=>{
        try {
            console.log('2');
            const {data} =  await movieDBServices.getAll()
            console.log(data);
            return  data

        }catch (e) {
            const err = e as AxiosError
            return  rejectWithValue(err.response.data)
        }
    }
)
const moviesFastSearch = createAsyncThunk<IMovie,string>(
    "movieSlice/moviesFastSearch",
    async (text,{rejectWithValue})=>{
        try {
            const {data} = await movieDBServices.search(1,text)
            return data
        }catch (e) {
            const err = e as AxiosError
            rejectWithValue(err.response.data)
        }
    }
)
const movieSlice = createSlice({
    name:'movieSlice',
    initialState,
    reducers:{
        setFastSearch:(state,action)=>{
            state.fastSearch = action.payload
        },
        movieSearchNull:(state)=>{
            state.moviesSearch = []
        },
        fastSearchNull:(state)=>{
            state.fastSearch = ''
        }
    },
    extraReducers:builder => builder
        .addCase(getAll.fulfilled,(state, action) => {
            state.answer = action.payload
            state.Movies = action.payload.results
        })
        .addCase(moviesFastSearch.fulfilled, (state, action) => {
            state.moviesSearch = action.payload.results
        })
        .addMatcher(isRejected(getAll),(state) => {
            state.error = "Помишка у пошуку"
        })
})
const {reducer:MovieReducer,actions} = movieSlice
const MovieActions = {...actions, getAll,moviesFastSearch}
export {
    MovieActions,
    MovieReducer
}