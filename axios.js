import axios from "axios";
import { baseURL } from "./src/Constants/Constants"; 

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;