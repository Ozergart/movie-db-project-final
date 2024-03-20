import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import css from './Header.module.css'
import {User} from "../User";
import {Search} from "../Search";
import {IEvent} from "../../types";
import { themeService} from "../../services";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {ThemeActions} from "../../store";
import {MovieActions} from "../../store";
import {MovieMini} from "../MovieMini/MovieMini";
import {GenresSearch} from "../Genres";

const Header = () => {

    const [genreSearchTrigger, setGenreSearchTrigger] = useState<boolean>(false)
    const [searchTrigger, setSearchTrigger] = useState<boolean>(false)


    const {darkTheme} = useAppSelector(state => state.theme)
    const {fastSearch,moviesSearch} = useAppSelector(state => state.movies)
    const dispatch = useAppDispatch();

    const input = document.getElementById('inputFast') as HTMLInputElement
    const search = () => {
        setGenreSearchTrigger(true)
    }
    const searchFilm = () => {
        setSearchTrigger(true)
    }
    const fastSearchValue = (e: IEvent): void => {
        dispatch(MovieActions.setFastSearch(e.target.value))
    }
    useEffect(() => {
        dispatch(MovieActions.moviesFastSearch(fastSearch))
    }, [fastSearch]);

    const fastSearchClosing = () => {
        input.value = ''
        dispatch(MovieActions.movieSearchNull())
        dispatch(MovieActions.fastSearchNull())
    }
    const themeSwitch = () => {
        dispatch(ThemeActions.themeSwitch())
        let now: boolean = themeService.getThemeFromLS()
        themeService.setThemeToLS(!now)
    }
    return (
        <div className={darkTheme ? css.HeaderDark : css.Header}>
            <Link to={''}><h1>MovieDB</h1></Link>
            <div className={darkTheme ? css.switchDark : css.switch}>
                {darkTheme ? <img width="30" height="30" src="https://img.icons8.com/emoji/48/crescent-moon-emoji.png"
                                  alt="crescent-moon-emoji"/> : null}
                <div className={darkTheme ? css.switch2Dark : css.switch2} onClick={themeSwitch}></div>
                {!darkTheme ?
                    <img className={'sun'} width="30" height="30" src="https://img.icons8.com/officel/16/sun.png"
                         alt="sun"/> : null}
            </div>
            <div className={darkTheme ? css.linksDark : css.links}>
                <button onClick={search}>Пошук по жанрам</button>
                <button onClick={searchFilm}>Розширений пошук</button>
            </div>
            <div className={darkTheme ? css.fastSearchDark : css.fastSearch}>
                <input type="text" onChange={fastSearchValue} id={'inputFast'} placeholder={'Швидкий пошук'}/>
                {moviesSearch.length > 0 ?
                    <div onMouseLeave={fastSearchClosing}
                         className={darkTheme ? css.fastSearchDiv + ' ' + css.fastSearchDivDark : css.fastSearchDiv}>
                        {moviesSearch.map(movie => <MovieMini key={movie.id} movie={movie}/>)}
                    </div> : null}
            </div>
            <User/>
            {genreSearchTrigger ? <GenresSearch setGenreSearchTrigger={setGenreSearchTrigger}/> : null}
            {searchTrigger ? <Search setSearchTrigger={setSearchTrigger}/> : null}
        </div>
    );
};

export {Header}