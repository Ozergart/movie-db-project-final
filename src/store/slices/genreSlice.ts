import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenre} from "../../interfaces";
import {AxiosError} from "axios";
import {genreService} from "../../services";

interface IState {
    allGenres:IGenre[];
    genres:string[];
}
const initialState:IState = {
    allGenres:[],
    genres:[]
}
const getAllGenres = createAsyncThunk<IGenre[],void>(
    "genreSlice/getAllGenres",
    async (_,{rejectWithValue})=>{
        try {
            const {data} = await genreService.getAll();
            return data.genres
        }catch (e){
            const err = e as AxiosError
            rejectWithValue(err.response.data)
        }
    }
)

const genreSlice = createSlice(
    {
        name:"genreSlice",
        initialState,
        reducers:{

        },
        extraReducers:builder => builder
            .addCase(getAllGenres.fulfilled, (state, action) => {
                state.allGenres = action.payload
            })

    }
)

const {reducer:GenreReducer,actions} = genreSlice
const GenreActions = {...actions, getAllGenres}
export {
    GenreActions,
    GenreReducer
}