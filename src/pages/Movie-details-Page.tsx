import React, {useEffect} from 'react';
import {MovieDetails} from "../components/MovieDetails/MovieDetails";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {OneMovieActions} from "../store/slices/oneMovieSlice";

const MovieDetailsPage = () => {
    const {movieId} = useParams<string>();

    const {movie,imdb_id,imdb_res} = useAppSelector(state => state.oneMovie);
    const dispatch = useAppDispatch() ;
    useEffect(() => {
       dispatch(OneMovieActions.getMovie(+movieId))

        if (imdb_id.length > 0) {
            dispatch(OneMovieActions.getFromOMdb(imdb_id))
        }
    }, [imdb_id, movieId]);


    return (
        <div>
            <MovieDetails movie={movie} imdb={imdb_res}/>
        </div>
    );
};

export {MovieDetailsPage}