import React from 'react';
import {Outlet} from "react-router-dom";

import css from './MainLayout.module.css'
import {Header} from "../components";
import {useAppSelector} from "../hooks";

const MainLayout = () => {
    const {darkTheme} = useAppSelector(state => state.theme);
    return (
        <div className={darkTheme?css.MainLayoutDark:css.MainLayout}>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {MainLayout}