import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IUser} from "../interfaces";


const userService = {
    get: (): IRes<IUser> => apiService.get(`${urls.user.base}/21028568`),
    setFavorite: (userId: number, movieId: number, status: boolean) => apiService.post(urls.movies.favorite(userId), {
            media_type: "movie",
            media_id: movieId,
            favorite: status
        }
    ),
    setWatchList: (userId: number, movieId: number, status: boolean) => apiService.post(urls.movies.watchList(userId), {
            media_type: "movie",
            media_id: movieId,
            watchlist: status
        }
    )}
export {
    userService
}