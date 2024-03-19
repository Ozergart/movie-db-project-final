import {createSlice} from "@reduxjs/toolkit";
import { themeService} from "../../services";


interface IState {
    darkTheme:boolean
}
const initialState:IState = {
    darkTheme: themeService.getThemeFromLS()||false
}

const themeSlice = createSlice({
    name:'themeSlice',
    initialState,
    reducers:{
        themeSwitch:(state)=>{
            state.darkTheme = !state.darkTheme
        }
    }
})

const {reducer:ThemeReducer,actions} = themeSlice
const ThemeActions = {...actions}
export {
    ThemeActions,
    ThemeReducer
}