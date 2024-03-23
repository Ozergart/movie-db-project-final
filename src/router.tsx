import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts";
import {MovieDetailsPage, MoviesPage} from "./pages";
import {FavoriteMoviesPage} from "./pages/FavoriteMoviesPage/FavoriteMoviesPage";
import {WatchMoviesPage} from "./pages/WatchMoviesPage/WatchMoviesPage";

const router = createBrowserRouter([
    {path:"", element:<MainLayout/>, children:[
            {index:true, element:<Navigate to={'/movies'}/>},
            {path:'movieDetails/:movieId', element:<MovieDetailsPage/>},
            {path:'movies/?page=:page&sort_by=:sort_by&idsWith=:idsWith?&idsWithout=:idsWithout?&queryParam=:queryParam?', element:<MoviesPage/>},
            {path:"favorite",element:<FavoriteMoviesPage/>},
            {path:'watchList', element:<WatchMoviesPage/>}
        ]}
])
export {
    router
}