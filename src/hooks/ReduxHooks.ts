import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {dispatchType, stateType} from "../types";

const useAppDispatch = useDispatch<dispatchType>
const useAppSelector:TypedUseSelectorHook<stateType> = useSelector

export {
    useAppSelector,
    useAppDispatch
}