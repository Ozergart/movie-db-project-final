import React, {FC, PropsWithChildren, useEffect} from 'react';

import css from './FastSearch.module.css'
import {MovieMini} from "../MovieMini/MovieMini";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {IEvent} from "../../../types";
import {MovieActions} from "../../../store";

interface IProps extends PropsWithChildren {

}

const FastSearch: FC<IProps> = () => {
    const {darkTheme} = useAppSelector(state => state.theme);
    const {fastSearch,moviesSearch} = useAppSelector(state => state.movies)
    const dispatch = useAppDispatch();

    const input = document.getElementById('inputFast') as HTMLInputElement
    useEffect(() => {
        dispatch(MovieActions.moviesFastSearch(fastSearch))
    }, [dispatch, fastSearch]);
    const fastSearchValue = (e: IEvent): void => {
        dispatch(MovieActions.setFastSearch(e.target.value))
    }

    const fastSearchClosing = () => {
        input.value = ''
        dispatch(MovieActions.movieSearchNull())
        dispatch(MovieActions.fastSearchNull())
    }

    return (
        <div className={darkTheme ? css.fastSearchDark : css.fastSearch}>
            <input type="text" onChange={fastSearchValue} id={'inputFast'} placeholder={'Швидкий пошук'}/>
            {moviesSearch.length > 0 ?
                <div onMouseLeave={fastSearchClosing}
                     className={darkTheme ? css.fastSearchDiv + ' ' + css.fastSearchDivDark : css.fastSearchDiv}>
                    {moviesSearch.map(movie => <MovieMini key={movie.id} movie={movie}/>)}
                </div> : null}
        </div>
    );
};

export {FastSearch}