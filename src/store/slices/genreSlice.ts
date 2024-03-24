import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IGenre} from "../../interfaces";
import {genreService} from "../../services";

interface IState {
    allGenres:IGenre[];
    genres:string[];
    genresWithout:string[];
    genresWith:string[]
}
const initialState:IState = {
    allGenres:[],
    genres:[],
    genresWithout:[],
    genresWith:[]
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
            genresWithNull:(state)=>{
                state.genresWith = []
            },
            genresWithoutNull:(state)=>{
                state.genresWithout = []
            },
            genresWithPush:(state,action)=>{
                state.genresWith.push(action.payload)
            },
            genresWithoutPush:(state,action)=>{
                state.genresWithout.push(action.payload)
            },
            removeFromGenresWith: (state, action) => {
                const stringToRemove = action.payload.toString();
                state.genresWith = state.genresWith.filter(genre => genre !== stringToRemove);
            },
            removeFromGenresWithout: (state, action) => {
                const stringToRemove = action.payload.toString();
                state.genresWithout = state.genresWith.filter(genre => genre !== stringToRemove);
            },
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