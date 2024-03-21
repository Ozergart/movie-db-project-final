import React, {useEffect} from 'react';

import {LoadingString, Movies} from "../../components";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";
import {MovieActions} from "../../store";



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
        }
    }, [pageURL, queryParam, with_genres, without_genres, sort_by, dispatch]);


    return (
        <div>
            {loading ? <LoadingString/> : <Movies/>}
        </div>
    );
};

export {MoviesPage}