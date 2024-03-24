import React from 'react';
import {useLocation, useSearchParams} from "react-router-dom";

import css from './Movies.module.css'
import {useAppSelector} from "../../hooks";
import {Movie} from "../MovieCont";
import {GenreDeleting} from "../Genres";
import {Pagination} from "../Pagination";
import {CreatedSorting, DateSorting, Original_titleSorting, PopularitySorting, RevenueSorting} from "../Sortings";


const Movies = () => {

    const {Movies, answer} = useAppSelector(state => state.movies);
    const [query, setQuery] = useSearchParams(
        {page: '1', idsWith: '', idsWithout: '', queryParam: '', sort_by: "popularity.desc"});

    const queryParam: string = query.get('queryParam')
    const pageURL: number = +query.get('page')

    const location = useLocation();

    const renderFilters = () => {
        if (location.pathname === '/favorite'||location.pathname === '/watchList') {
            return (
                <div className={css.sorting}>
                    <p>Сортувати за:</p>
                    <CreatedSorting setQuery={setQuery} query={query}/>
                </div>
            );
        } else {
            return (
                <div className={css.sorting}>
                    <p>Сортувати за:</p>
                    <PopularitySorting setQuery={setQuery} query={query}/>
                    <RevenueSorting setQuery={setQuery} query={query}/>
                    <DateSorting setQuery={setQuery} query={query}/>
                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                    <Original_titleSorting setQuery={setQuery} query={query}/>
                </div>
            );
        }
    };

    return (
        <div className={css.bigCont}>
                <div>{Movies.length > 0 ?
                    <div>
                    <div className={css.MovieHeader}>
                        <div className={css.genreDeliting}>
                            <GenreDeleting query={query} setQuery={setQuery}/>
                        </div>
                        <Pagination pageURL={pageURL} setQuery={setQuery} result={answer}/>
                        <div className={css.sortingCont}>{!queryParam && renderFilters()}</div>
                    </div>
                    <div className={css.Movies}>{Movies.map(movie => <Movie key={movie.id} movie={movie}/>)}</div>
                    <div className={css.bottomPages}><Pagination pageURL={pageURL} setQuery={setQuery} result={answer}/>
                    </div>
                </div> :
                <div className={css.Nothing}>Вибачте за вашим запитом нічого не знайдено</div>
                }</div>
        </div>
    );
};

export {Movies}