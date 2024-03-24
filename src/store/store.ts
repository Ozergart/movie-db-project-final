import {configureStore} from "@reduxjs/toolkit";

import {GenreReducer, MovieReducer} from "./slices";
import {ThemeReducer} from "./slices";
import {UserReducer} from "./slices";
import {LoadingReducer} from "./slices";
import {OneMovieReducer} from "./slices";
import {TrailerReducer} from "./slices";

const store = configureStore({
        reducer: {
            movies:MovieReducer,
            genres:GenreReducer,
            theme:ThemeReducer,
            user:UserReducer,
            loading:LoadingReducer,
            oneMovie:OneMovieReducer,
            trailer:TrailerReducer
        }
    }
)
export {
    store
}