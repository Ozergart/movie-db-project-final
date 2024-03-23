import {apiService} from "./apiService";
import {urls} from "../constants";
import {IMovie, IMovieBig} from "../interfaces";
import {IRes} from "../types";
import {IAccState} from "../interfaces/IAccState";

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
    }),
    similarById:(id:number):IRes<IMovie>=>apiService.get(urls.movies.similarById(id), {'params': {'language': 'uk'}}),
    getAccState:(movieId:number):IRes<IAccState>=>apiService.get(urls.movies.accStateById(movieId)),
    getFavorite:(userId:number,page:number,sort_by:string):IRes<IMovie>=>apiService.get(urls.movies.favoriteGet(userId),{params:{
            page,
            sort_by,
            language:'uk'
        }}),
    getWatchLIst:(userId:number,page:number,sort_by:string):IRes<IMovie>=>apiService.get(urls.movies.watchListGet(userId),{params:{
            page,
            sort_by,
            language:'uk'
        }}),
    setRating:(movieId:number,rating:number)=>apiService.post(urls.movies.rating(movieId), {"value":rating})
}
export  {
    movieDBServices
}