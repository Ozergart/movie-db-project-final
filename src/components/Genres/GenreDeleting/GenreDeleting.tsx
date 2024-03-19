import {FC, PropsWithChildren, useEffect, useState} from 'react';
import {SetURLSearchParams} from "react-router-dom";

import css from './GenreDeleting.module.css'
import {genreService} from "../../../services";
import {GenreDel} from "./GenreDel";
import {useAppSelector} from "../../../hooks";

interface IProps extends PropsWithChildren {
    query: URLSearchParams
    setQuery: SetURLSearchParams
}

const GenreDeleting: FC<IProps> = ({query}) => {
    const [genres, setGenres] = useState<string[]>([])
    const [genres2, setGenres2] = useState<string[]>([])
    const {allGenres} = useAppSelector(state => state.genres)

    useEffect(() => {
        const stringMass = genreService.paramsToString(query, 'idsWith')
        const ids: number[] = stringMass.map(string => +string)
        const genresName: string[] = genreService.idsToNames(ids, allGenres);
        setGenres(genresName)
        const stringMass2 = genreService.paramsToString(query, 'idsWithout')
        const ids2: number[] = stringMass2.map(string => +string)
        const genresName2: string[] = genreService.idsToNames(ids2, allGenres);
        setGenres2(genresName2);
    }, [allGenres, query]);
    return (
        <div>

            {genres2 && genres && (genres.length > 0 || genres2.length > 0) ? (<div className={css.cont}>
                {genres.map(genre => (
                    <GenreDel key={genre} genre={genre} added={'idsWith'}/>
                ))}
                {genres2.map(genre => (
                    <GenreDel key={"_" + genre} genre={genre} added={'idsWithout'}/>
                ))}
            </div>) : null}

        </div>
    );
};

export {GenreDeleting}
