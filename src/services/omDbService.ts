import axios from "axios";

import {IRes} from "../types";
import {urls} from "../constants";
import {IMdbRes} from "../interfaces";

const omDbService = {
    getById: (IMdb_id: string): IRes<IMdbRes> => axios.get(urls.omdbById(IMdb_id))
}
export {
    omDbService
}