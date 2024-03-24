import React, {FC, PropsWithChildren, useState} from 'react';

import css from './Poster.module.css'
import {setStateType} from "../../../types";
import {useAppSelector} from "../../../hooks";
import {genreService, userService} from "../../../services";
import {Genres} from "../../Genres";


interface IProps extends PropsWithChildren {
    setTrailerTrigger:setStateType<boolean>
}

const Poster: FC<IProps> = ({setTrailerTrigger}) => {
    const {trailer} = useAppSelector(state => state.trailer);
    const {accState,movie} = useAppSelector(state => state.oneMovie);
    const {user} = useAppSelector(state => state.user);


    const [favorite, setFavorite] = useState<boolean>(accState.favorite)
    const [watchList, setWatchList] = useState<boolean>(accState.watchlist)

    const {poster_path,title,genres} = movie

    const setFavoriteClick = async ()=>{
        await userService.setFavorite(user.id,+movie.id,!favorite)
        setFavorite(prevState => !prevState)
    }
    const setWatchListClick = async ()=>{
        await userService.setWatchList(user.id,+movie.id,!watchList)
        setWatchList(prevState => !prevState)
    }

    const handleTrailerClick = () => {
        if (trailer) {
            setTrailerTrigger(prevState => !prevState)
        }
    };

    const renderTrailerIcon = () => {
        if (trailer) {
            return (
                <img
                    src={`https://img.icons8.com/nolan/96/play.png`}
                    alt="play"
                    className={css.play}
                />
            );
        }
        return null;
    };
    return (
        <div>
            <div className={css.posterBlock}>
                <div className={trailer ? css.posterBlockWithTrailer : null} onClick={handleTrailerClick}>
                    <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`постер фільму ${title}`}
                         className={css.poster}/>
                    {renderTrailerIcon()}
                </div>
                <div className={css.listBlock}>
                    <div className={css.favoriteList} onClick={() => setFavoriteClick()}
                         style={{backgroundColor: favorite ? 'green' : 'red'}}><img width="40" height="40"
                                                                                    src="https://img.icons8.com/ios-filled/40/star--v1.png"
                                                                                    alt="star--v1"/></div>
                    <div className={css.watchList} onClick={() => setWatchListClick()}
                         style={{backgroundColor: watchList ? 'green' : 'red'}}><img width="40" height="40"
                                                                                     src="https://img.icons8.com/dotty/80/visible.png"
                                                                                     alt="visible"/></div>
                </div>
                <div className={css.genres}><Genres genre_ids={genreService.objectToIds(genres)}
                                                    horisontal={false}/>
                </div>
            </div>
        </div>
    );
};

export {Poster}