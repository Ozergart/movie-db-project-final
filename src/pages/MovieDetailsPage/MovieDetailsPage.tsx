import React, {useEffect} from 'react';
import {MovieDetails} from "../../components";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {OneMovieActions} from "../../store";
import {LinearProgress, Stack} from "@mui/material";
import css from "../../components/MoviesCont/Movies.module.css";

const MovieDetailsPage = () => {
    const {movieId} = useParams<string>();

    const {movie,imdb_id,imdb_res} = useAppSelector(state => state.oneMovie);
    const {loading} = useAppSelector(state => state.loading);
    const dispatch = useAppDispatch() ;
    useEffect(() => {
       dispatch(OneMovieActions.getMovie(+movieId))
        if (imdb_id.length > 0) {
            dispatch(OneMovieActions.getFromOMdb(imdb_id))
        }
    }, [dispatch, imdb_id, movieId]);


    return (
        <div>
            {loading ? <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2} className={css.loading}>
                    <LinearProgress color="secondary"/>
                    <LinearProgress color="success"/>
                    <LinearProgress color="inherit"/>
                </Stack> :
                <MovieDetails movie={movie} imdb={imdb_res}/>}
        </div>
    );
};

export {MovieDetailsPage}