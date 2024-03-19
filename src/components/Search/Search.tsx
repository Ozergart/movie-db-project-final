import React, {FC, PropsWithChildren, useState} from 'react';
import {useNavigate} from "react-router-dom";

import css from './Search.module.css'
import {IEvent, setStateType} from "../../types";
import {useAppSelector} from "../../hooks";


interface IProps extends PropsWithChildren {
    setSearchTrigger: setStateType<boolean>
}

const Search: FC<IProps> = ({setSearchTrigger}) => {

    const {darkTheme} = useAppSelector(state => state.theme);
    const [inputValue, setInputValue] = useState<string>('')
    const navigate = useNavigate();

    const close = () => {
        setSearchTrigger(false)
    }
    const saveInput = (e: IEvent) => {
        e.preventDefault()
        setInputValue(e.target.value)
    }
    const search = (event: React.FormEvent) => {
        event.preventDefault()
        navigate(`/movies/?page=1&idsWith=&idsWithout=&queryParam=${inputValue}`);
        setSearchTrigger(false);
    };
    return (

        <div className={darkTheme ? css.ContDark : css.Cont}>
            <div className={darkTheme ? css.SearchDark : css.Search}>
                <form onSubmit={search}>
                    <input type="text" onChange={saveInput}
                           className={darkTheme ? css.inputDark : css.input}
                           placeholder={"Введіть текст"}
                           id={'input'}/>
                    <button onClick={search} disabled={inputValue.length === 0}
                            className={darkTheme ? css.startDark : css.start}>
                        <img width="50" height="50" src="https://img.icons8.com/stickers/100/search.png" alt="search"/>
                    </button>
                </form>
                <div className={css.close} onClick={close}><img src="https://img.icons8.com/papercut/60/delete-sign.png"
                                                                alt="close"/></div>
            </div>

        </div>
    );
};
export {Search}