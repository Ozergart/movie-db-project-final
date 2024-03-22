import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { useNavigate } from "react-router-dom";

import css from './MovieDetails.module.css';
import { IMdbRes } from "../../interfaces";
import { Genres } from "../Genres";
import { genreService } from "../../services";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { TrailerActions } from "../../store";
import { Trailer } from "../TrailerCont";

interface IProps extends PropsWithChildren {
    imdb: IMdbRes
}

const MovieDetails: FC<IProps> = ({ imdb }) => {
    const {darkTheme} = useAppSelector(state => state.theme);
    const {trailer, videosUk, videosEn} = useAppSelector(state => state.trailer);
    const {movie} = useAppSelector(state => state.oneMovie);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [trailerTrigger, setTrailerTrigger] = useState<boolean>(false);

    useEffect(() => {
        dispatch(TrailerActions.trailerSetNull());
        if (videosEn.length > 0 || videosUk.length > 0) {
            dispatch(TrailerActions.getTrailerFromVideos());
        }
    }, [videosUk, videosEn, trailer, dispatch]);

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
    return (
        <div className={darkTheme ? css.MovieDetailsDark : css.MovieDetails}
             style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop})`}}>
            <div className={css.bigCont}>
                <div className={css.posterBlock}>
                    <div className={trailer ? css.posterBlockWithTrailer : undefined} onClick={handleTrailerClick}>
                        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`постер фільму ${title}`}
                             className={css.poster}/>
                        {renderTrailerIcon()}
                    </div>
                    <div className={css.genres}><Genres genre_ids={genreService.objectToIds(genres)}
                                                        horisontal={false}/></div>
                </div>
                <div className={darkTheme ? css.smallContDark : css.smallCont}>
                    <div className={css.starsCont}>
                        <Rating className={css.stars} orientation={"horizontal"} value={vote_average / 2}
                                radius={"small"} readOnly={true} halfFillMode={"svg"} itemStyles={starStyle}/>
                        <p>Всього оцінок {vote_count}, середня {(vote_average / 2).toFixed(2)}</p>
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
                </div>
            </div>
            {trailerTrigger && <Trailer settrailerTrigger={setTrailerTrigger}/>}
        </div>
    );
};
export {MovieDetails}