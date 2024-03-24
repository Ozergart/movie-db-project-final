import React, {FC, PropsWithChildren} from 'react';
import {SetURLSearchParams} from "react-router-dom";

import css from './Pagination.module.css'
import {usePages} from "../../../hooks";
import {IMovie} from "../../../interfaces";

interface IProps extends PropsWithChildren {
    pageURL: number
    setQuery: SetURLSearchParams
    result: IMovie
}

const   Pagination: FC<IProps> = ({pageURL, setQuery, result}) => {
    return (
        <div className={css.pageDivBig}>
            <div className={css.pageDiv}>
                {(pageURL - 3 > 0) && (
                    <button onClick={() => usePages.change(setQuery, -3)}>{pageURL - 3}</button>)}
                {(pageURL - 2 > 0) && (
                    <button onClick={() => usePages.change(setQuery, -2)}>{pageURL - 2}</button>)}
                {(pageURL - 1 > 0) && (
                    <button onClick={() => usePages.change(setQuery, -1)}>{pageURL - 1}</button>)}
                <p>{pageURL}</p>
                {(pageURL + 1 < 501) && !(pageURL + 1 > result.total_pages) && (
                    <button onClick={() => usePages.change(setQuery, 1)}>{pageURL + 1}</button>)}
                {(pageURL + 2 < 501) && !(pageURL + 2 > result.total_pages) && (
                    <button onClick={() => usePages.change(setQuery, 2)}>{pageURL + 2}</button>)}
                {(pageURL + 3 < 501) && !(pageURL + 3 > result.total_pages) && (
                    <button onClick={() => usePages.change(setQuery, 3)}>{pageURL + 3}</button>)}
            </div>
        </div>
    )
}
export {Pagination}