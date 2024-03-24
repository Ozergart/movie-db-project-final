import React, {FC, PropsWithChildren, useState} from 'react';
import {Rating, RoundedStar} from "@smastrom/react-rating";

import css from './RatingActive.module.css'
import {useAppSelector} from "../../../hooks";
import {IMdbRes} from "../../../interfaces";
import {movieDBServices} from "../../../services";


interface IProps extends PropsWithChildren {
    imdb:IMdbRes
}

const RatingActive: FC<IProps> = ({imdb}) => {
    const {movie,accState} = useAppSelector(state => state.oneMovie);

    const [movieRating, setMovieRating] = useState<{value:number}|false>(accState.rated)

    const {vote_count,vote_average} = movie

    const rateClick = async (rating:number)=>{
        if(rating>0) {
            await movieDBServices.setRating(movie.id, rating * 2)
            setMovieRating({'value': rating * 2})
        }
    }

    const renderRatings = ()=> {
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

    const starStyle = {
        itemShapes: RoundedStar,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#fbf1a9'
    };
    return (
        <div>
            <div className={css.starsCont}>
                <Rating className={css.stars} value={+(vote_average / 2).toFixed(0)} itemStyles={starStyle} onChange={rateClick} />
                <p>Всього оцінок {vote_count}, середня {(vote_average / 2).toFixed(2)}</p>
                <p>Ваша очінка: {movieRating?movieRating.value/2:'Відсутня'}</p>
                {renderRatings()}
            </div>
        </div>
    );
};

export {RatingActive}