import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

import {LoadingString, MovieDetails} from "../../components";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {OneMovieActions, TrailerActions} from "../../store";



const MovieDetailsPage = () => {
    const {movieId} = useParams<string>();

    const {movie, imdb_id, imdb_res} = useAppSelector(state => state.oneMovie);
    const {loading} = useAppSelector(state => state.loading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(OneMovieActions.getMovie(+movieId))
        dispatch(TrailerActions.getVideosUk(+movieId))
        dispatch(TrailerActions.getVideosEn(+movieId))
        if (imdb_id?.length > 0) {
            dispatch(OneMovieActions.getFromOMdb(imdb_id))
        }
    }, [dispatch, imdb_id, movieId]);


    return (
        <div>
            {!movie||loading ? <LoadingString/> : <MovieDetails imdb={imdb_res}/>}
        </div>
    );
};

export {MovieDetailsPage}