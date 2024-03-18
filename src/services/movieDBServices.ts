import {apiService} from "./apiService";
import {urls} from "../constants";
import {IMovie} from "../interfaces";
import {IRes} from "../types";

const movieDBServices = {
    getAll:():IRes<IMovie>=>apiService.get(urls.movies.base, {params:{
            language:'uk',
            sort_by:"popularity.desc",
            page:'1'
        }})
}
export  {
    movieDBServices
}