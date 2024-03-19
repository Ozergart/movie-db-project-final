import {FC, PropsWithChildren} from 'react';
import {useSearchParams} from "react-router-dom";

import css from './GenreDeleting.module.css'
import {genreService} from "../../../services";
import {useAppSelector} from "../../../hooks";


interface IProps extends PropsWithChildren {
    genre: string
    added: string
}

const GenreDel: FC<IProps> = ({genre, added}) => {
    const [query, setQuery] = useSearchParams(
        {page: '1', idsWith: '', idsWithout: '', queryParam: '', sort_by: "popularity.desc"});
    const {allGenres} = useAppSelector(state => state.genres)
    const id = genreService.nameToId(genre, allGenres)
    const remove = () => {
        const idsReady = genreService.genreRemoveFromURL(id, query, added);
        setQuery(prev => {
            prev.set(added, genreService.IdsToString(idsReady))
            return prev
        })
    }
    return (
        <div onClick={remove} className={added === 'idsWithout' ? css.genreRed : css.genre}>
            {genre}
            <img width="30" height="30" src="https://img.icons8.com/ios-filled/30/cancel.png" alt="cancel"/>
        </div>
    );
};
export {GenreDel}
