import {FC, PropsWithChildren} from 'react';
import {IMovieRes} from "../../interfaces";

interface IProps extends PropsWithChildren {
movie:IMovieRes
}

const Movie: FC<IProps> = ({movie}) => {
    const {id,genre_ids,original_title} = movie
    return (
        <div>
            <div>id:{id}</div>
            <div>genre_ids:{genre_ids}</div>
            <div>original_title:{original_title}</div>
        </div>
    );
};

export {Movie}