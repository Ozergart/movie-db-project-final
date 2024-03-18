import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts";
import {MovieDetailsPage, MoviesPage} from "./pages";

const router = createBrowserRouter([
    {path:"", element:<MainLayout/>, children:[
            {index:true, element:<Navigate to={'movies'}/>},
            {path:'movies', element:<MoviesPage/>},
            {path:'movieDetails', element:<MovieDetailsPage/>}
        ]}
])
export {
    router
}