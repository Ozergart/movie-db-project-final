import {configureStore} from "@reduxjs/toolkit";
import {GenreReducer, MovieReducer} from "./slices";
import {ThemeReducer} from "./slices/themeSlice";
import {UserReducer} from "./slices/userSlice";

const store = configureStore({
        reducer: {
            movies:MovieReducer,
            genres:GenreReducer,
            theme:ThemeReducer,
            user:UserReducer
        }
    }
)
export {
    store
}