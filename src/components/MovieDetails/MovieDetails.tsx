import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { useNavigate} from "react-router-dom";

import css from './MovieDetails.module.css';
import { IMdbRes } from "../../interfaces";
import { Genres } from "../Genres";
import {genreService, movieDBServices, userService} from "../../services";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { TrailerActions } from "../../store";
import { Trailer } from "../TrailerCont";
import {SimilarMovies} from "../SimilarMovies";

interface IProps extends PropsWithChildren {
    imdb: IMdbRes
}

const MovieDetails: FC<IProps> = ({ imdb }) => {
    const {darkTheme} = useAppSelector(state => state.theme);
    const {trailer, videosUk, videosEn} = useAppSelector(state => state.trailer);
    const {user} = useAppSelector(state => state.user);
    const {movie,accState} = useAppSelector(state => state.oneMovie);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const [trailerTrigger, setTrailerTrigger] = useState<boolean>(false);
    const [similarTrigger, setSimilarTrigger] = useState<boolean>(false);
    const [favorite, setFavorite] = useState<boolean>(accState.favorite)
    const [watchList, setWatchList] = useState<boolean>(accState.watchlist)
    const [movieRating, setMovieRating] = useState<{value:number}|false>(accState.rated)

    useEffect(() => {
        dispatch(TrailerActions.trailerSetNull());
        if (videosEn.length > 0 || videosUk.length > 0) {
            dispatch(TrailerActions.getTrailerFromVideos());
        }
        if (similarTrigger) {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [videosUk, videosEn, trailer, dispatch, similarTrigger]);

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

    const setFavoriteClick = async ()=>{
        await userService.setFavorite(user.id,+movie.id,!favorite)
        setFavorite(prevState => !prevState)
    }
    const setWatchListClick = async ()=>{
        await userService.setWatchList(user.id,+movie.id,!watchList)
        setWatchList(prevState => !prevState)
    }
    const rateClick = async (rating:number)=>{
        if(rating>0) {
            await movieDBServices.setRating(movie.id, rating * 2)
            setMovieRating({'value': rating * 2})
        }
    }

    const renderRatings = () => {
        if (imdb && imdb.Ratings) {
            return imdb.Ratings.map(rating => (
                <div key={rating.Source} className={css.ratings}>
                    <p className={css.source}>{rating.Source}: </p>
                    <h6 className={css.rate}> {rating.Value}</h6>
                </div>
            ));
        }
        return null;
    };

    const renderOriginalTitle = () => {
        return original_title !== title ? <p>Назва оригіналу: {original_title}</p> : null;
    };

    const renderCountryOfProduction = () => {
        return production_countries.map((country, index) => (
            <span key={index}>
                {country.name}
                {index !== production_countries.length - 1 && ", "}
            </span>
        ));
    };

    const renderProductionCompanies = () => {
        return production_companies.map((company, index: number) => (
            <span key={index}>
                {company.name}
                {index !== production_companies.length - 1 && ", "}
            </span>
        ));
    };
    const similarActivation = async () => {
        setSimilarTrigger(prev=>!prev)
    }
    const {
        production_companies,
        production_countries,
        belongs_to_collection,
        vote_count,
        vote_average,
        poster_path,
        title,
        original_title,
        backdrop_path,
        genres,
        overview,
        release_date
    } = movie;
    const backdrop: string = belongs_to_collection?.backdrop_path || backdrop_path;
    const starStyle = {
        itemShapes: RoundedStar,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#fbf1a9'
    };
    console.log(movie);
    return (
        <div className={darkTheme ? css.MovieDetailsDark : css.MovieDetails}
             style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop})`}}>
            <div className={css.bigCont}>
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
                <div className={darkTheme ? css.smallContDark : css.smallCont}>
                    <div className={css.starsCont}>
                        <Rating className={css.stars} value={+(vote_average / 2).toFixed(0)} itemStyles={starStyle} onChange={rateClick} />
                        <p>Всього оцінок {vote_count}, середня {(vote_average / 2).toFixed(2)}</p>
                        <p>Ваша очінка: {movieRating?movieRating.value/2:'Відсутня'}</p>
                        {renderRatings()}
                    </div>
                    <div className={css.title}>
                        <img onClick={() => navigate(-1)} width="35" height="35"
                             src="https://img.icons8.com/flat-round/64/back--v1.png" alt="back--v1"/>
                        <h2>{title}</h2>
                    </div>
                    {renderOriginalTitle()}
                    <p>Дата виходу:{release_date}</p>
                    <div>
                        Країна виробник: {renderCountryOfProduction()}
                    </div>
                    <div>
                        Компанія виробник: {renderProductionCompanies()}
                    </div>
                    <p>{overview}</p>
                    <button className={darkTheme?css.similarActivatorDark:css.similarActivator}
                          onClick={()=>similarActivation()}>
                        {similarTrigger?"Приховати":"Показати схожі"}
                    </button>

                </div>
            </div>
            {trailerTrigger && <Trailer settrailerTrigger={setTrailerTrigger}/>}
            {similarTrigger&&<SimilarMovies/>}
        </div>
    );
};
export {MovieDetails}