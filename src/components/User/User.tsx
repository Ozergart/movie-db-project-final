import React, {useEffect, } from 'react';

import css from './User.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {UserActions} from "../../store";


const User = () => {
    const {darkTheme} = useAppSelector(state => state.theme);
    const {user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(UserActions.getUser())
    }, [dispatch]);
    if(!user){
        return <p>Loading</p>
    }
    const {username,avatar:{gravatar:{hash}},id} = user

    return (
            <div className={darkTheme ? css.UserDark : css.User}>
                <div>
                    <p>{username}</p>
                    <p className={css.id}>id:{id}</p>
                </div>
                <img src={`https://www.gravatar.com/avatar/${hash}`} alt="avatar error"/>
            </div>
    );
};

export {User}