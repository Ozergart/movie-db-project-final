import {configureStore} from "@reduxjs/toolkit";
import {MovieReducer} from "./slices";

const store = configureStore({
        reducer: {
            movies:MovieReducer
        }
    }
)
export {
    store
}