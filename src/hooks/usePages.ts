import {SetURLSearchParams} from "react-router-dom";

const usePages = {
    change: (setQuery: SetURLSearchParams, value: number) => {
        setQuery(prev => {
            prev.set('page', `${+prev.get('page') + value}`)
            return prev
        })
    }
}
export {
    usePages
}