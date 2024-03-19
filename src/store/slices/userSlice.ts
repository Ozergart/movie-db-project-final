import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces";
import {AxiosError} from "axios";
import {userService} from "../../services";


interface IState {
user:IUser
}

const initialState:IState = {
user:null
}
const getUser = createAsyncThunk(
    "userSlice/getUser",
    async (_,{rejectWithValue})=>{
        try {
            const {data} = await userService.get();
            return data
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{

    },
    extraReducers:builder => builder
        .addCase(getUser.fulfilled,(state, action) => {
            state.user = action.payload
        })
})

const {reducer:UserReducer, actions}= userSlice
const UserActions = {...actions,getUser}
export {
    UserActions,
    UserReducer
}