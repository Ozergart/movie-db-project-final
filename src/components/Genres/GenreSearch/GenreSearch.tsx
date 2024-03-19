import {FC, PropsWithChildren, useEffect, useState} from 'react';

import {IGenre} from "../../../interfaces";
import css from './AllGenres.module.css'
import {stateType} from "../../../types";

interface IProps extends PropsWithChildren {
    genre: IGenre
    reset: boolean
    // setReset: stateType<boolean>
}

const GenreSearch: FC<IProps> = ({genre, reset,
                                     // setReset
}) => {
    // const {setGenresWithout, setGenresWith} = useAppContext();
    // const [status, setStatus] = useState<'added' | 'removed' | 'neutral'>('neutral');
    // const clickNeutral = () => {
    //     setStatus('added');
    //     setGenresWith(prev => [...prev, genre.id.toString()]);
    // };
    // const clickAdded = () => {
    //     setStatus('removed');
    //     setGenresWith(prev => prev.filter(id => id !== genre.id.toString()));
    //     setGenresWithout(prev => [...prev, genre.id.toString()]);
    // };
    // const clickRemoved = () => {
    //     setStatus('neutral');
    //     setGenresWithout(prevGenresWithout => prevGenresWithout.filter(id => id !== genre.id.toString()));
    // };
    // useEffect(() => {
    //     if (reset) {
    //         setStatus('neutral')
    //         setGenresWith([])
    //         setGenresWithout([])
    //         setReset(false);
    //     }
    // }, [reset]);
    return (
        <div>
            {/*{(status === 'neutral') ? (*/}
            {/*    <button onClick={clickNeutral} className={`${css.neutral} ${css.genre}`}>{genre.name}</button>*/}
            {/*) : null}*/}
            {/*{(status === 'added') ? (*/}
            {/*    <button onClick={clickAdded} className={`${css.added} ${css.genre}`}>{genre.name}</button>*/}
            {/*) : null}*/}
            {/*{(status === 'removed') ? (*/}
            {/*    <button onClick={clickRemoved} className={`${css.removed} ${css.genre}`}>{genre.name}</button>*/}
            {/*) : null}*/}

        </div>


    );
};

export {GenreSearch}