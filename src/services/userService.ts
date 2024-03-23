import {apiService, apiServiceFetch} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IUser} from "../interfaces";


const userService = {
    get: (): IRes<IUser> => apiService.get(`${urls.user.base}/21028568`),
    setFavorite: (userId: number, movieId: number, status: boolean) => apiServiceFetch("https://api.themoviedb.org/3" + urls.movies.favorite(userId), {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjc0NDJkZDg1NmU0MzliMjk2NDlkMjE5NDFkNmFmZiIsInN1YiI6IjY1ZDlkOWUxZTc4ZTJkMDE4NjgwZTRkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BR4Phoh54qV9MDfUL9tForE69wPOmMj4La5d_VUunoU'
        },
        body: JSON.stringify({
            media_type: "movie",
            media_id: movieId,
            favorite: status
        })
    }),
    setWatchList: (userId: number, movieId: number, status: boolean) => apiServiceFetch("https://api.themoviedb.org/3" + urls.movies.watchList(userId), {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjc0NDJkZDg1NmU0MzliMjk2NDlkMjE5NDFkNmFmZiIsInN1YiI6IjY1ZDlkOWUxZTc4ZTJkMDE4NjgwZTRkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BR4Phoh54qV9MDfUL9tForE69wPOmMj4La5d_VUunoU'
        },
        body: JSON.stringify({
            media_type: "movie",
            media_id: movieId,
            watchlist: status
        })
    }),
}
export {
    userService
}