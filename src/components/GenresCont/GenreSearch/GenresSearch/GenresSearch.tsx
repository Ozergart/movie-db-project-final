import React, {FC, PropsWithChildren, useState} from 'react';
import {useNavigate} from "react-router-dom";

import css from "./GenresSearch.module.css"
import {GenreSearch} from "../GenreSearch/GenreSearch";
import {setStateType} from "../../../../types";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {GenreActions} from "../../../../store";

interface IProps extends PropsWithChildren {
    setGenreSearchTrigger: setStateType<boolean>
}

const GenresSearch: FC<IProps> = ({setGenreSearchTrigger}) => {

    const {darkTheme} = useAppSelector(state => state.theme);
    const {allGenres, genresWithout, genresWith} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();

    const [reset, setReset] = useState(false);
    const resetAllGenres = () => {
        setReset(true);
    };
    const navigate = useNavigate();
    const apply = () => {
        navigate(`/movies/?page=1&idsWith=${genresWith}&idsWithout=${genresWithout}`)
        setGenreSearchTrigger(false)
        dispatch(GenreActions.genresWithNull())
        dispatch(GenreActions.genresWithoutNull())
    }
    const close = () => {
        dispatch(GenreActions.genresWithNull())
        dispatch(GenreActions.genresWithoutNull())
        setGenreSearchTrigger(false);
    }
    return (
        <div className={darkTheme ? css.bigContDark : css.bigCont}>
            <div className={darkTheme ? css.genresSearchDark : css.genresSearch}>
                <div className={css.smallCont}>{allGenres.map(genre =>
                    <GenreSearch key={genre.name} genre={genre}
                                 reset={reset}
                                 setReset={setReset}/>)}</div>
                <div className={css.buttonsCont}>
                    <button onClick={apply}>Шукати</button>
                    <button onClick={resetAllGenres}>Скинути</button>
                    <button onClick={close}>Закрити</button>
                </div>
            </div>
        </div>
    );
}
export {GenresSearch}