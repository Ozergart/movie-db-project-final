import {SetURLSearchParams} from "react-router-dom";
import {FC, PropsWithChildren, useEffect, useState} from 'react';

import css from './TitleSorting.module.css'

interface IProps extends PropsWithChildren {
    setQuery: SetURLSearchParams
    query: URLSearchParams
}

const TitleSorting: FC<IProps> = ({setQuery, query}) => {
    const urlStat = query.get('sort_by').slice(query.get("sort_by").indexOf('.')+1)
    const [status, setStatus] = useState<string>(urlStat)

    useEffect(() => {
        if ((query.get("sort_by") !== "title.desc") && (query.get("sort_by") !== "title.asc")) {
            setStatus('neutral')
        }

    }, [query]);

    const neutralClick = () => {
        setStatus('desc')
        setQuery(prev => {
            prev.set("sort_by", "title.desc")
            return prev
        })
    }
    const descClick = () => {
        setStatus('asc')
        setQuery(prev => {
            prev.set("sort_by", "title.asc")
            return prev
        })
    }
    const ascClick = () => {
        setStatus('desc')
        setQuery(prev => {
            prev.set("sort_by", "title.desc")
            return prev
        })
    }


    return (
        <div className={css.cont}>
            {status === 'neutral' && <div onClick={neutralClick} className={css.filter}>назвою </div>}
            {status === 'desc' && <div onClick={descClick} className={css.filter}>назвою
                <img width="15" height="15"
                     src="https://img.icons8.com/ios-filled/50/expand-arrow--v1.png"
                     alt="expand-arrow--v1"/></div>}
            {status === 'asc' && <div onClick={ascClick} className={css.filter}>назвою
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXElEQVR4nN2RMQqAMAwAb1Lwf4UoVX/lR13sJimZBGnSSbwlS+4IBH7J2CuuwAVsPWIBDpvugJigASXZBXtUxBuQF7EZEBNz47L0DEzACSz4mG1fvUr0n0Nw/0vc38UVHyc2bOMAAAAASUVORK5CYII="
                    alt={'down'}/>
            </div>}
        </div>
    );
};

export {TitleSorting}