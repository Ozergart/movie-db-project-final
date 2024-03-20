import {FC, PropsWithChildren, useEffect, useState} from 'react';

import {IGenre} from "../../../../interfaces";
import css from './GenreSearch.module.css'
import {setStateType} from "../../../../types";
import {useAppDispatch} from "../../../../hooks";
import {GenreActions} from "../../../../store";

interface IProps extends PropsWithChildren {
    genre: IGenre
    reset: boolean
    setReset: setStateType<boolean>
}

const GenreSearch: FC<IProps> = ({genre, reset, setReset}) => {
    const dispatch = useAppDispatch();

    const [status, setStatus] = useState<'added' | 'removed' | 'neutral'>('neutral');
    const clickNeutral = () => {
        setStatus('added');
        dispatch(GenreActions.genresWithPush(genre.id.toString()))
    };
    const clickAdded = () => {
        setStatus('removed');
        dispatch(GenreActions.removeFromGenresWith(genre.id))
        dispatch(GenreActions.genresWithoutPush(genre.id.toString()))
    };
    const clickRemoved = () => {
        setStatus('neutral');
        dispatch(GenreActions.removeFromGenresWithout(genre.id))
    };
    useEffect(() => {
        if (reset) {
            setStatus('neutral')
            dispatch(GenreActions.genresWithNull())
            dispatch(GenreActions.genresWithoutNull())
            setReset(false);
        }
    }, [reset]);
    return (
        <div>
            {(status === 'neutral') ? (
                <button onClick={clickNeutral} className={`${css.neutral} ${css.genre}`}>{genre.name}</button>
            ) : null}
            {(status === 'added') ? (
                <button onClick={clickAdded} className={`${css.added} ${css.genre}`}>{genre.name}</button>
            ) : null}
            {(status === 'removed') ? (
                <button onClick={clickRemoved} className={`${css.removed} ${css.genre}`}>{genre.name}</button>
            ) : null}

        </div>


    );
};

export {GenreSearch}