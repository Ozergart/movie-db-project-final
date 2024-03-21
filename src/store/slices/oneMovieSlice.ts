import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMdbRes, IMovieBig} from "../../interfaces";
import {AxiosError} from "axios";
import {movieDBServices, omDbService} from "../../services";

interface IState {
    movie:IMovieBig
    imdb_id:string
    imdb_res:IMdbRes
}

const initialState: IState = {
    movie:null,
    imdb_id:"",
    imdb_res:null
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
const OneMovieSlice = createSlice({
    name: "OneMovieSlice",
    initialState,
    reducers: {

    },
    extraReducers: builder => builder
        .addCase(getMovie.fulfilled, (state, action) => {
            state.imdb_id = null
            state.movie = action.payload
            state.imdb_id = action.payload.imdb_id
        })
        .addCase(getFromOMdb.fulfilled,(state, action) => {
            state.imdb_res = action.payload
        })
})

const { reducer: OneMovieReducer, actions } = OneMovieSlice
const OneMovieActions = { ...actions , getMovie,getFromOMdb}
export {
    OneMovieActions,
    OneMovieReducer
}