import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMdbRes, IMovieBig, IMovieRes} from "../../interfaces";
import {movieDBServices, omDbService} from "../../services";
import {IAccState} from "../../interfaces/IAccState";

interface IState {
    movie:IMovieBig
    imdb_id:string
    imdb_res:IMdbRes
    similar:IMovieRes[]
    accState:IAccState
}

const initialState: IState = {
    movie:null,
    imdb_id:"",
    imdb_res:null,
    similar:[],
    accState:null
}

const getMovie = createAsyncThunk<IMovieBig,number>(
    "OneMovieSlice/getMovie",
    async (id:number,{rejectWithValue})=>{
        try {
            const {data}  = await movieDBServices.byId(id)
            return data
        }catch (e){
            const err = e as AxiosError
            rejectWithValue(err.response.data)
        }
    }
)
const getFromOMdb = createAsyncThunk<IMdbRes,string>(
    "OneMovieSlice/getFromOMdb",
    async (id,{rejectWithValue})=>{
        try {
            const {data} = await omDbService.getById(id);
            return  data
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const similarById = createAsyncThunk<IMovieRes[],number>(
    "OneMovieSlice/similarById",
    async (id,{rejectWithValue})=>{
        try {
           const {data} = await movieDBServices.similarById(id)
            return data.results
        }catch (e) {
            const err = e as AxiosError
            rejectWithValue(err.response.data)
        }
    }
)
const getAccState = createAsyncThunk<IAccState,number>(
    "OneMovieSlice/getAccState",
    async (movieId,{rejectWithValue})=>{
        try {
            const {data} = await movieDBServices.getAccState(movieId)
            return data
        }catch (e){
            const err = e as AxiosError
            rejectWithValue(err.response.data)
        }
    }
)
const OneMovieSlice = createSlice({
    name: "OneMovieSlice",
    initialState,
    reducers: {
        movieSetNull:(state)=>{
            state.movie = null
        },
        accStateSetNull:(state)=>{
            state.accState = null
        }
    },
    extraReducers: builder => builder
        .addCase(getMovie.fulfilled, (state, action) => {
            state.imdb_id = null
            state.movie = null
            state.movie = action.payload
            state.imdb_id = action.payload.imdb_id
        })
        .addCase(getFromOMdb.fulfilled,(state, action) => {
            state.imdb_res = action.payload
        })
        .addCase(similarById.fulfilled, (state, action) => {
            state.similar = action.payload
        })
        .addCase(getAccState.fulfilled, (state, action) => {
            state.accState = action.payload
        })
})

const { reducer: OneMovieReducer, actions } = OneMovieSlice
const OneMovieActions = { ...actions , getMovie,getFromOMdb,similarById,getAccState}
export {
    OneMovieActions,
    OneMovieReducer
}