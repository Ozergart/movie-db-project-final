import React, {FC, PropsWithChildren} from 'react';

import css from './Switcher.module.css'
import {ThemeActions} from "../../../store";
import {themeService} from "../../../services";
import {useAppDispatch, useAppSelector} from "../../../hooks";

interface IProps extends PropsWithChildren {

}

const Switcher: FC<IProps> = () => {
    const {darkTheme} = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();

    const themeSwitch = () => {
        dispatch(ThemeActions.themeSwitch())
        let now: boolean = themeService.getThemeFromLS()
        themeService.setThemeToLS(!now)
    }
    const moonIcon = (
        <img
            width="30"
            height="30"
            src="https://img.icons8.com/emoji/48/crescent-moon-emoji.png"
            alt="crescent-moon-emoji"
        />
    );

    const sunIcon = (
        <img
            className={'sun'}
            width="30"
            height="30"
            src="https://img.icons8.com/officel/16/sun.png"
            alt="sun"
        />
    );

    return (
        <div className={darkTheme ? css.switchDark : css.switch}>
            {darkTheme && moonIcon}
            <div className={darkTheme ? css.switch2Dark : css.switch2} onClick={themeSwitch}></div>
            {!darkTheme && sunIcon}
        </div>
    );
};

export {Switcher}