import React, {FC, PropsWithChildren, useState} from 'react';
import {useNavigate} from "react-router-dom";

import css from './MovieDetails.module.css';
import {Trailer} from "../TrailerCont";
import {SimilarMovies} from "../SimilarMovies";
import {Poster} from "../PosterCont";
import {RatingActive} from "../RatingActive";
import {useAppSelector} from "../../../hooks";
import {IMdbRes} from "../../../interfaces";


interface IProps extends PropsWithChildren {
    imdb: IMdbRes
}

const MovieDetails: FC<IProps> = ({imdb}) => {
    const {darkTheme} = useAppSelector(state => state.theme);
    const {movie} = useAppSelector(state => state.oneMovie);
    const navigate = useNavigate();

    const [similarTrigger, setSimilarTrigger] = useState<boolean>(false);
    const [trailerTrigger, setTrailerTrigger] = useState<boolean>(false);



    const similarActivation = async () => {
        setSimilarTrigger(prev => !prev)
    }
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
    const renderAdditionalInfo = () => {
        return <div className={css.additional}>
            {imdb && imdb.Actors ? <p>Актори: {imdb.Actors}</p> : null}
            {imdb && imdb.Writer ? <p>Сценаристи: {imdb.Writer}</p> : null}
            {imdb && imdb.Director ? <p>Директор: {imdb.Director}</p> : null}
            {imdb && imdb.Awards && imdb.Awards.length > 3 ? <p>Нагороди: {imdb.Awards}</p> : null}
        </div>
    }

    const {
        production_companies,
        production_countries,
        belongs_to_collection,
        title,
        original_title,
        backdrop_path,
        overview,
        release_date
    } = movie;
    const backdrop: string = belongs_to_collection?.backdrop_path || backdrop_path;
    return (
        <div className={darkTheme ? css.MovieDetailsDark : css.MovieDetails}
             style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop})`}}>
            <div className={css.bigCont}>
                <Poster setTrailerTrigger={setTrailerTrigger}/>
                <div className={darkTheme ? css.smallContDark : css.smallCont}>
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
                    {renderAdditionalInfo()}
                    <p>{overview}</p>
                    <RatingActive imdb={imdb}/>
                    <button className={darkTheme ? css.similarActivatorDark : css.similarActivator}
                            onClick={() => similarActivation()}>
                        {similarTrigger ? "Приховати" : "Показати схожі"}
                    </button>
                </div>
            </div>
            {trailerTrigger && <Trailer setTrailerTrigger={setTrailerTrigger}/>}
            {similarTrigger && <SimilarMovies/>}
        </div>
    );
};
export {MovieDetails}