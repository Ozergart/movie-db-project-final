import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {ITrailerAnswer, ITrailerResults} from "../interfaces";

const trailerService = {
    getByMovieIdUk:(id:number):IRes<ITrailerAnswer>=> apiService.get(urls.movies.videoByIds(id),{params:{
            language:'uk'
        }}),
    getByMovieIdEn:(id:number):IRes<ITrailerAnswer>=> apiService.get(urls.movies.videoByIds(id),{params:{
            language:'en'
        }}),
    trailerFromVideos:(videos:ITrailerResults[]):ITrailerResults=>{
        for (const video of videos) {
            if(video.type === "Trailer"){
                return video
            }
        }
    }
}
export {
    trailerService
}