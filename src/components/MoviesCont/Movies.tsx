import React, {useEffect,} from 'react';

import css from './Movies.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {MovieActions} from "../../store";
import {Movie} from "../MovieCont/Movie";


const Movies = () => {

    const dispatch = useAppDispatch();
    const {Movies} = useAppSelector(state => state.movies);
    useEffect(() => {
        dispatch(MovieActions.getAll())
    }, []);

    return (
        <div className={css.Movies}>
            {Movies.map(movie=><Movie key={movie.id} movie={movie}/>)}
        </div>
    );
};

export {Movies}