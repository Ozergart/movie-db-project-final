import {IMovieRes} from "./IMovieRes";


export interface IMovie {
    page: number
    results: IMovieRes[]
    total_pages: number
    total_results: number
}