import React, {useEffect} from 'react';

import {Movies} from "../../components";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";
import {MovieActions} from "../../store";
import css from "../../components/MoviesCont/Movies.module.css";
import {LinearProgress, Stack} from "@mui/material";


const MoviesPage = () => {
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector(state => state.loading);
    const [query] = useSearchParams(
        {page: '1', idsWith: '', idsWithout: '', queryParam: '', sort_by: "popularity.desc"});

    const pageURL: number = +query.get('page')
    const sort_by = query.get('sort_by')
    const queryParam: string = query.get('queryParam')

    const with_genres: string = query.get('idsWith')
    const without_genres: string = query.get('idsWithout')


    useEffect(() => {
        if (queryParam && queryParam.length > 0) {
            dispatch(MovieActions.movieSearch({page: pageURL, queryParam,}))
        } else {
            dispatch(MovieActions.getAll({page: pageURL, with_genres, without_genres, sort_by}))
            console.log(loading);
        }
    }, [pageURL, queryParam, with_genres, without_genres, sort_by]);


    return (
        <div>
            {loading ? <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2} className={css.loading}>
                    <LinearProgress color="secondary"/>
                    <LinearProgress color="success"/>
                    <LinearProgress color="inherit"/>
                </Stack> :
                <Movies/>}
        </div>
    );
};

export {MoviesPage}