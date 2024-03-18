import axios from "axios";
import {baseURL} from "../constants";

const apiService = axios.create({baseURL})
apiService.interceptors.response.use("Bearer ")