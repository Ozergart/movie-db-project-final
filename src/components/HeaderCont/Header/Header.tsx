import React, { useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import css from './Header.module.css'
import {Search} from "../../Search";
import { useAppSelector} from "../../../hooks";
import {GenresSearch} from "../../GenresCont";
import {Switcher} from "../Switcher";
import {User} from "../User";
import {FastSearch} from "../FastSearch";

const Header = () => {

    const [genreSearchTrigger, setGenreSearchTrigger] = useState<boolean>(false)
    const [searchTrigger, setSearchTrigger] = useState<boolean>(false)

    const {darkTheme} = useAppSelector(state => state.theme)
    const navigate = useNavigate();

    const search = () => {
        setGenreSearchTrigger(true)
    }
    const searchFilm = () => {
        setSearchTrigger(true)
    }
    const favorite = ()=>{
        navigate('/favorite?page=1&sort_by=created_at.asc')
    }
    const watchList = ()=>{
        navigate('/watchList?page=1&sort_by=created_at.asc')
    }



    return (
        <div className={darkTheme ? css.HeaderDark : css.Header}>
            <Link to={''}><h1>MovieDB</h1></Link>
            <Switcher/>
            <div className={darkTheme ? css.linksDark : css.links}>
                <button onClick={search}>Пошук по жанрам</button>
                <button onClick={()=>watchList()}>Список переглянутого</button>
                <button onClick={()=>favorite()}>Улюбленне</button>
                <button onClick={searchFilm}>Розширений пошук</button>
            </div>
            <FastSearch/>
            <User/>
            {genreSearchTrigger ? <GenresSearch setGenreSearchTrigger={setGenreSearchTrigger}/> : null}
            {searchTrigger ? <Search setSearchTrigger={setSearchTrigger}/> : null}
        </div>
    );
};

export {Header}