import {SetURLSearchParams} from "react-router-dom";
import {FC, PropsWithChildren, useEffect, useState} from 'react';

import css from './CreatedSorting.module.css'

interface IProps extends PropsWithChildren {
    setQuery: SetURLSearchParams
    query: URLSearchParams
}

const CreatedSorting: FC<IProps> = ({setQuery, query}) => {
    const urlStat = query.get('sort_by').slice(query.get("sort_by").indexOf('.')+1)
    const [status, setStatus] = useState<string>(urlStat)
    // useEffect(() => {
    //     if ((query.get("sort_by") !== "created_at.desc") && (query.get("sort_by") !== "created_at.asc")) {
    //         setStatus("neutral")
    //     }
    // }, [query]);
    // const neutralClick = () => {
    //     setStatus("desc")
    //     setQuery(prev => {
    //         prev.set("sort_by", "created_at.desc")
    //         return prev
    //     })
    // }
    const descClick = () => {
        setStatus("asc")
        setQuery(prev => {
            prev.set("sort_by", "created_at.asc")
            return prev
        })
    }
    const ascClick = () => {
        setStatus("desc")
        setQuery(prev => {
            prev.set("sort_by", "created_at.desc")
            return prev
        })
    }
    return (
        <div className={css.cont}>
            {/*{status === "neutral" ? <div onClick={neutralClick} className={css.filter}>датою створення </div> : null}*/}
            {status === "desc" ? <div onClick={descClick} className={css.filter}>датою створення
                <img width="15" height="15"
                     src="https://img.icons8.com/ios-filled/50/expand-arrow--v1.png"
                     alt="expand-arrow--v1"/></div> : null}
            {status === "asc" ? <div onClick={ascClick} className={css.filter}>датою створення
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXElEQVR4nN2RMQqAMAwAb1Lwf4UoVX/lR13sJimZBGnSSbwlS+4IBH7J2CuuwAVsPWIBDpvugJigASXZBXtUxBuQF7EZEBNz47L0DEzACSz4mG1fvUr0n0Nw/0vc38UVHyc2bOMAAAAASUVORK5CYII="
                    alt={'down'}/>
            </div> : null}
        </div>
    );
};

export {CreatedSorting}