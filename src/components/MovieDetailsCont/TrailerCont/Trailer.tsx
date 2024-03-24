import React, {FC, PropsWithChildren} from 'react';


import css from "./Trailer.module.css"
import {useAppSelector} from "../../../hooks";
import {setStateType} from "../../../types";



interface IProps extends PropsWithChildren {
    setTrailerTrigger: setStateType<boolean>
}

const Trailer: FC<IProps> = ({setTrailerTrigger}) => {


    const {darkTheme} = useAppSelector(state => state.theme);
    const {trailer} = useAppSelector(state => state.trailer);
    const {key} = trailer




    const close = () => {
        setTrailerTrigger(false);
    }
    return (
        <div className={darkTheme ? css.bigContDark : css.bigCont}>
            <div className={darkTheme ? css.trailerDark : css.trailer}>
                <iframe title={'trailer'} width="80%" height="90%" src={`https://www.youtube.com/embed/${key}`}
                        allowFullScreen></iframe>
                <img width="60" height="60" src="https://img.icons8.com/papercut/60/cancel.png" alt="cancel"
                     className={css.close} onClick={close}/>
            </div>
        </div>
    );
}
export {Trailer}