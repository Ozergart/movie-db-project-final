import React, {useEffect,} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {MovieActions} from "../../store";
import {Movie} from "./Movie";


const Movies = () => {

    const dispatch = useAppDispatch();
    const {Movies} = useAppSelector(state => state.movies);
    console.log('start');

    useEffect(() => {
        dispatch(MovieActions.getAll())
    }, []);

    return (
        <div>
            {Movies.map(movie=><Movie key={movie.id} movie={movie}/>)}
        </div>
    );
};

export {Movies}