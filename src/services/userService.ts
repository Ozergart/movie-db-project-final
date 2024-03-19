import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IUser} from "../interfaces";


const userService = {
    get: (): IRes<IUser> => apiService.get(`${urls.user.base}/21028568`)
}
export {
    userService
}