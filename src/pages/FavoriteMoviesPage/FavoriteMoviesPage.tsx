import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {MovieActions} from "../../store";
import {LoadingString, Movies} from "../../components";

const FavoriteMoviesPage = () => {
    const {loading} = useAppSelector(state => state.loading);
    const {user} = useAppSelector(state => state.user);
    const {Movies:movies} = useAppSelector(state => state.movies);
    const [query] = useSearchParams(
        {page: '1',  sort_by: "created_at.asc"});
    const pageURL: number = +query.get('page')
    const sort_by = query.get('sort_by')

    const dispatch = useAppDispatch();
    useEffect(() => {
        if(user) {
            dispatch(MovieActions.getFavorite({
                userId:user.id,
                page:pageURL,
                sort_by}))
        }
    }, [dispatch, pageURL, sort_by, user]);
    return (
        <div>
            {!movies||loading?<LoadingString/>:<Movies/>}
        </div>
    );
};

export {FavoriteMoviesPage}