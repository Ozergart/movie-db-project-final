import {FC, PropsWithChildren} from 'react';

import {useAppSelector} from "../../../hooks";
import css from './SimilarMovies.module.css'
import {LoadingString} from "../../Loadings";
import {Movie} from "../../MoviesCont";


interface IProps extends PropsWithChildren {

}

const SimilarMovies: FC<IProps> = () => {
    const {similar} = useAppSelector(state => state.oneMovie);
    const {darkTheme} = useAppSelector(state => state.theme);


    if (similar.length === 0) {
        return <LoadingString/>
    }
    const renderSimilar = () => {
        const similarMovies = [];
        for (let i = 0; i < 5; i++) {
            similarMovies.push(<Movie movie={similar[i]} key={similar[i].id}/>);
        }
        return similarMovies;
    }


    return (
        <div className={darkTheme ? css.similarDark : css.similar} id={'similar'}>
            {renderSimilar()}
        </div>
    );
};

export {SimilarMovies}