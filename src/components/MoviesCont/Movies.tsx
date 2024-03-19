import React, {useEffect,} from 'react';

import css from './Movies.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {MovieActions} from "../../store";
import {Movie} from "../MovieCont/Movie";
import {useSearchParams} from "react-router-dom";
import {GenreDeleting} from "../Genres/GenreDeleting/GenreDeleting";
import {Pagination} from "../Pagination/Pagination";


const Movies = () => {
    const dispatch = useAppDispatch();
    const {Movies, answer} = useAppSelector(state => state.movies);
    const [query, setQuery] = useSearchParams(
        {page: '1', idsWith: '', idsWithout: '', queryParam: '', sort_by: "popularity.desc"});

    const pageURL: number = +query.get('page')
    const sorting = query.get('sort_by')
    const queryParam: string = query.get('queryParam')

    const with_genres: string = query.get('idsWith')
    const without_genres: string = query.get('idsWithout')


    useEffect(() => {
        if (queryParam && queryParam.length > 0) {
            dispatch(MovieActions.movieSearch({page: pageURL, queryParam,}))
        } else {
            dispatch(MovieActions.getAll({page: pageURL, with_genres, without_genres}))
            console.log(dispatch(MovieActions.getAll({page: pageURL, with_genres, without_genres})));
        }
    }, [pageURL, queryParam, with_genres, without_genres]);

    return (
        <div className={css.bigCont}>
            {Movies.length > 0 ? <div>
                    <div className={css.MovieHeader}>
                        <div className={css.genreDeliting}>
                            <GenreDeleting query={query} setQuery={setQuery}/>
                        </div>
                        <Pagination pageURL={pageURL} setQuery={setQuery} result={answer}/>
                        <div className={css.sortingCont}>{!queryParam ? <div className={css.sorting}>
                            <p>Сортувати за:</p>
                            {/*<PopularitySorting setQuery={setQuery} query={query}/>*/}
                            {/*<RevenueSorting setQuery={setQuery} query={query}/>*/}
                            {/*<DateSorting setQuery={setQuery} query={query}/>*/}
                            {/*<Original_titleSorting setQuery={setQuery} query={query}/>*/}
                        </div> : null}</div>
                    </div>
                    <div className={css.Movies}>{Movies.map(movie => <Movie key={movie.id} movie={movie}/>)}</div>
                    <div className={css.bottomPages}><Pagination pageURL={pageURL} setQuery={setQuery} result={answer}/>
                    </div>
                </div> :
                <div className={css.Nothing}>Вибачте за вашим запитом нічого не знайдено</div>
            }
        </div>
    );
};

export {Movies}