import {apiService} from "./apiService";
import {urls} from "../constants";
import {IMovie, IMovieBig} from "../interfaces";
import {IRes} from "../types";

const movieDBServices = {
    byId: (id: number): IRes<IMovieBig> => apiService.get(urls.movies.byId(id), {'params': {'language': 'uk'}}),
    getAll:(page:number,with_genres:string,without_genres:string,sort_by:string='popularity.desc'):IRes<IMovie>=>apiService.get(urls.movies.base, {params:{
            page,
            with_genres,
            without_genres,
            sort_by,
            language:'uk'
        }}),
    search: (page: number = 1, queryParam: string): IRes<IMovie> => apiService.get(urls.movies.search, {
        'params': {
            'page': `${page}`,
            'query': queryParam,
            'language': 'uk'
        }
    })
}
export  {
    movieDBServices
}