import {FC, PropsWithChildren} from 'react';
import {useNavigate} from "react-router-dom";

import css from './MovieMini.module.css'
import {IMovieRes} from "../../interfaces";
import {useAppSelector} from "../../hooks";



interface IProps extends PropsWithChildren {
    movie: IMovieRes
}

const MovieMini: FC<IProps> = ({movie}) => {
    const {darkTheme} = useAppSelector(state => state.theme);
    const navigate = useNavigate();
    const {id, title} = movie
    return (
        <div className={darkTheme ? css.MovieMiniDark : css.MovieMini}
             onClick={() => navigate(`/movieDetails/${id}`)}>{title}</div>
    );
};
export {MovieMini}