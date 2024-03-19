import {FC, PropsWithChildren, useEffect, useState} from 'react';

import {genreService} from "../../../services";
import css from './Genre&Genres.module.css'

import {Genre} from "./Genre";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {GenreActions} from "../../../store";

interface IProps extends PropsWithChildren {
    genre_ids: number[]
    horisontal?: boolean
}

const Genres: FC<IProps> = ({genre_ids, horisontal = true}) => {
    const {allGenres} = useAppSelector(state => state.genres)
    const dispatch = useAppDispatch();
    const [GenresNames, setGenresNames] = useState<string[]>([])




    useEffect(() => {
        if (allGenres.length === 0) {
             dispatch(GenreActions.getAllGenres());
        }
        else if (genre_ids && allGenres.length > 0) {
           setGenresNames( genreService.idsToNames(genre_ids, allGenres))

        } else {
            setGenresNames(["GenresError"]);
        }
    }, [allGenres, genre_ids]);

    return (
        <div className={horisontal ? css.Genres : css.GenresVertical}>
            {GenresNames.map(genre => <Genre genre={genre} key={genre}/>)}
        </div>
    );
};
export {Genres}