import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";

import css from './MainLayout.module.css'
import {Header} from "../components";
import {useAppDispatch, useAppSelector} from "../hooks";
import {GenreActions} from "../store";


const MainLayout = () => {
    const {darkTheme} = useAppSelector(state => state.theme);
    const {allGenres} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (allGenres.length === 0) {
            dispatch(GenreActions.getAllGenres());
        }
    }, [allGenres.length, dispatch]);

    return (
        <div className={darkTheme?css.MainLayoutDark:css.MainLayout}>
            <Header/>
             <Outlet/>
        </div>
    );
};

export {MainLayout}