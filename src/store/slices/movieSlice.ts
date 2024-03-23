import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
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
const getAll = createAsyncThunk<IMovie,{page:number,without_genres:string,with_genres:string,sort_by:string}>(
    "movieSlice/getAll",
    async ({page,with_genres,without_genres,sort_by},{rejectWithValue})=>{
        try {
            const {data} =  await movieDBServices.getAll(page,with_genres,without_genres,sort_by)
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
const movieSearch = createAsyncThunk<IMovie, { page:number, queryParam:string }>(
    "movieSlice/movieSearch",
    async ({page,queryParam},{rejectWithValue})=>{
        try {
            const {data} = await movieDBServices.search(page,queryParam);
            return data
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const getFavorite = createAsyncThunk<IMovie,{ userId:number,page:number,sort_by:string }>(
    'movieSlice/getFavorite',
    async ({userId, page, sort_by},{rejectWithValue})=>{
        try {
            const {data} = await movieDBServices.getFavorite(userId,page,sort_by)
            return data
        }catch (e) {
            const err = e as AxiosError
            rejectWithValue(err.response.data)
        }
    }
)
const getWatchList = createAsyncThunk<IMovie, { userId:number,page:number,sort_by:string }>(
    'movieSlice/getWatchList',
    async ({userId, page, sort_by},{rejectWithValue})=>{
        try {
            const {data} = await movieDBServices.getWatchLIst(userId,page,sort_by)
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
        .addCase(movieSearch.fulfilled,(state, action) => {
            state.answer = action.payload
            state.Movies = action.payload.results
        })
        .addCase(moviesFastSearch.fulfilled, (state, action) => {
            state.moviesSearch = action.payload.results
        })
        .addMatcher(isFulfilled(getFavorite,getWatchList,getAll),(state, action) => {
            state.answer = action.payload
            state.Movies = action.payload.results
        })
        .addMatcher(isRejected(getAll),(state) => {
            state.error = "Помишка у пошуку"
        })
})
const {reducer:MovieReducer,actions} = movieSlice
const MovieActions = {...actions, getAll,moviesFastSearch,movieSearch,getFavorite,getWatchList}
export {
    MovieActions,
    MovieReducer
}