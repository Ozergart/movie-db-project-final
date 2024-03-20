import {FC, PropsWithChildren} from 'react';
import {Link} from "react-router-dom";

import css from './Genre.module.css'
import {genreService} from "../../../../services";
import {useAppSelector} from "../../../../hooks";

interface IProps extends PropsWithChildren {
    genre: string
}

const Genre: FC<IProps> = ({genre}) => {

    const {allGenres} = useAppSelector(state => state.genres);

    return (
        <div>
            {genre !== "GenresError" ?
                <Link to={`http://localhost:3000/movies/?page=1&idsWith=${genreService.nameToId(genre, allGenres)}`}
                      className={css.Genre}>
                    {genre}
                </Link> :
                <p>{genre}</p>}
        </div>
    );
};
export {Genre}