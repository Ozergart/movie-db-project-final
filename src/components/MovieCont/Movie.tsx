import {FC, PropsWithChildren} from 'react';
import {useNavigate} from "react-router-dom";
import {Rating, RoundedStar} from "@smastrom/react-rating";

import {IMovieRes} from "../../interfaces";
import css from './Movie.module.css'
import {Genres} from "../Genres";

interface IProps extends PropsWithChildren {
movie:IMovieRes
}

const Movie: FC<IProps> = ({movie}) => {

    const {id, poster_path, title, genre_ids, vote_count, vote_average} = movie

    const starStyle = {
        itemShapes: RoundedStar,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#fbf1a9'
    }
    let navigate = useNavigate();
    return (
        <div className={css.Movie}>
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`постер фільму ${title}`}
                 onClick={() => navigate(`/movieDetails/${id}`)}/>
            <div><Genres genre_ids={genre_ids}/></div>
            <Rating orientation={"horizontal"} value={vote_average / 2} radius={"small"} readOnly={true}
                    halfFillMode={"svg"} itemStyles={starStyle}/>
            <p>Всього оцінок {vote_count}, середня {(vote_average / 2).toFixed(2)}</p>
        </div>
    );
};
export {Movie}