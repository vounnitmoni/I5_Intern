import axios from "axios"
export const baseURL = 'http://localhost:8080/api';
const ApiManager = axios.create({
    baseURL: 'hhttp://localhost:8080/api',
    responseType: 'json',
    withCredentials: true
})

export default ApiManager