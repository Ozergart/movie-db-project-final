import React, {FC, PropsWithChildren} from 'react';
import {Rating, RoundedStar} from "@smastrom/react-rating";
import {useNavigate} from "react-router-dom";

import css from './MovieDetails.module.css'
import {IMdbRes, IMovieBig} from "../../interfaces";
import {Genres} from "../Genres/Genre";
import {genreService} from "../../services";
import {useAppSelector} from "../../hooks";


interface IProps extends PropsWithChildren {
    movie: IMovieBig
    imdb: IMdbRes
}

const MovieDetails: FC<IProps> = ({movie, imdb}) => {
    const {darkTheme} = useAppSelector(state => state.theme);
    const navigate = useNavigate();
    let ImdbTrigger = false
    if (!movie) {
        return <div>Loading...</div>;
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
        release_date,
    } = movie;
    if (imdb) {
        ImdbTrigger = true
    }


    const backdrop: string = belongs_to_collection?.backdrop_path || backdrop_path
    const starStyle = {
        itemShapes: RoundedStar,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#fbf1a9'
    };

    return (
        <div className={darkTheme ? css.MovieDetailsDark : css.MovieDetails}
             style={{'backgroundImage': `url(https://image.tmdb.org/t/p/w500${backdrop})`}}>
            <div className={css.bigCont}>
                <div className={css.posterBlock}>
                    <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`постер фільму ${title}`}/>
                    <div className={css.genres}><Genres genre_ids={genreService.objectToIds(genres)}
                                                        horisontal={false}/></div>
                </div>
                <div className={darkTheme ? css.smallContDark : css.smallCont}>
                    <div className={css.starsCont}>
                        <Rating className={css.stars} orientation={"horizontal"} value={vote_average / 2}
                                radius={"small"} readOnly={true} halfFillMode={"svg"} itemStyles={starStyle}/>
                        <p>Всього оцінок {vote_count}, середня {(vote_average / 2).toFixed(2)}</p>
                        {ImdbTrigger&&imdb.Ratings ? imdb.Ratings.map(rating => (
                            <div key={rating.Source} className={css.ratings}>
                                <p className={css.source}>{rating.Source}: </p> <h6
                                className={css.rate}> {rating.Value}</h6>
                                {/*<p className={css.source}>Рейтинг на  {rating.Source}: </p> <h6 className={css.rate}> {rating.Value}</h6>*/}
                            </div>)) : null}
                    </div>
                    <div className={css.title}>
                        <img onClick={() => navigate(-1)} width="35" height="35"
                             src="https://img.icons8.com/flat-round/64/back--v1.png" alt="back--v1"/>
                        <h2>{title}</h2>
                    </div>
                    {original_title !== title ? <p>Назва оригіналу:{original_title}</p> : null}
                    <p>Дата виходу:{release_date}</p>
                    <div>
                        Країна виробник:
                        {production_countries.map((country, index) => (
                            <span key={index}>
                                {country.name}
                                {index !== production_countries.length - 1 && ", "}
                            </span>
                        ))}
                    </div>
                    <div>
                        Компанія виробник:
                        {production_companies.map((company, index: number) => (
                                <span key={index}>
                                {company.name}
                                    {index !== production_companies.length - 1 && ", "}
                            </span>
                            )
                        )}
                    </div>
                    {ImdbTrigger&&imdb.Actors ? <p>Актори: {imdb.Actors}</p> : null}
                    {ImdbTrigger&&imdb.Writer ? <p>Сценаристи: {imdb.Writer}</p> : null}
                    {ImdbTrigger&&imdb.Director ? <p>Директор: {imdb.Director}</p> : null}
                    {ImdbTrigger&&imdb.Awards && imdb.Awards.length > 3 ? <p>Нагороди: {imdb.Awards}</p> : null}
                    {/*{budget>0?(<p>Бюджет: {budget}</p>):null}*/}
                    <p>{overview}</p>
                </div>
            </div>
        </div>
    );
};
export {MovieDetails}