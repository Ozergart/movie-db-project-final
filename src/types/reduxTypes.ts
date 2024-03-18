import {store} from "../store";


type stateType = ReturnType<typeof store.getState>
type dispatchType = typeof store.dispatch

export type{
    stateType,
    dispatchType
}