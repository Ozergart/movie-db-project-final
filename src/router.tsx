import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts";
import {MovieDetailsPage, MoviesPage} from "./pages";

const router = createBrowserRouter([
    {path:"", element:<MainLayout/>, children:[
            {index:true, element:<Navigate to={'/movies'}/>},
            {path:'movies/?page=:page&sort_by=:sort_by&idsWith=:idsWith?&idsWithout=:idsWithout?&queryParam=:queryParam?', element:<MoviesPage/>},
            {path:'movieDetails/:movieId', element:<MovieDetailsPage/>}
        ]}
])
export {
    router
}