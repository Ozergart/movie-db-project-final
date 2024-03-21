import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import { ITrailerResults} from "../../interfaces";
import {trailerService} from "../../services";

interface IState {
    videosUk:ITrailerResults[],
    videosEn:ITrailerResults[],
    trailer:ITrailerResults
}

const initialState: IState = {
    videosUk:[],
    videosEn:[],
    trailer:null
}
const getVideosEn = createAsyncThunk<ITrailerResults[],number>(
    'trailerSlice/getVideosEn',
    async (id,{rejectWithValue})=>{
        try {
            const {data} = await trailerService.getByMovieIdEn(id)
            return data.results
        }catch (e){
            const err = e as AxiosError
            rejectWithValue(err.response.data)
        }
    }
)
const getVideosUk = createAsyncThunk<ITrailerResults[],number>(
    'trailerSlice/getVideosUk',
    async (id,{rejectWithValue})=>{
        try {
            const {data} = await trailerService.getByMovieIdUk(id)
            return data.results
        }catch (e){
            const err = e as AxiosError
            rejectWithValue(err.response.data)
        }
    }
)
const trailerSlice = createSlice({
    name: "trailerSlice",
    initialState,
    reducers: {
        getTrailerFromVideos:(state)=>{
            state.trailer = trailerService.trailerFromVideos(state.videosUk)
            if (!state.trailer){
                state.trailer = trailerService.trailerFromVideos(state.videosEn)
            }
        },
        trailerSetNull:(state)=>{
            state.trailer = null
        }
    },
    extraReducers: builder => builder
        .addCase(getVideosUk.fulfilled,(state, action) => {
            state.videosUk = action.payload
        })
        .addCase(getVideosEn.fulfilled,(state, action) => {
            state.videosEn = action.payload
        })
})

const { reducer: TrailerReducer, actions } = trailerSlice
const TrailerActions = { ...actions ,getVideosEn,getVideosUk}
export {
    TrailerActions,
    TrailerReducer
}