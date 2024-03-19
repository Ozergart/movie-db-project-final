import {configureStore} from "@reduxjs/toolkit";
import {GenreReducer, MovieReducer} from "./slices";
import {ThemeReducer} from "./slices/themeSlice";
import {UserReducer} from "./slices/userSlice";
import {LoadingReducer} from "./slices/loadingSlice";
import {OneMovieReducer} from "./slices/oneMovieSlice";

const store = configureStore({
        reducer: {
            movies:MovieReducer,
            genres:GenreReducer,
            theme:ThemeReducer,
            user:UserReducer,
            loading:LoadingReducer,
            oneMovie:OneMovieReducer
        }
    }
)
export {
    store
}