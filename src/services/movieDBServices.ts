import {apiService} from "./apiService";
import {urls} from "../constants";

const movieDBServices = {
    getAll:()=>apiService.get(urls.movies.base, {params:{
            language:'uk',
            sort_by:"popularity.desc",
            page:'1'
        }})
}
export  {
    movieDBServices
}