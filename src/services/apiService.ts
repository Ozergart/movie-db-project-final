import axios from "axios";
import {baseURL} from "../constants";

const apiService = axios.create({baseURL})
const apiServiceFetch=(url:string,params:{}) => fetch(url,params)
apiService.interceptors.request.use((request)=>{
    request.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjc0NDJkZDg1NmU0MzliMjk2NDlkMjE5NDFkNmFmZiIsInN1YiI6IjY1ZDlkOWUxZTc4ZTJkMDE4NjgwZTRkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BR4Phoh54qV9MDfUL9tForE69wPOmMj4La5d_VUunoU'
    return request
})

export {
    apiService,
    apiServiceFetch
}