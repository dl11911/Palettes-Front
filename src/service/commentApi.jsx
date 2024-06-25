import axios from "axios";
import jwtAxios from "./jwtAxios";
import {url} from "../utils/single";

const API_SERVER_HOST= url;

export const addComment = (dto) => {
    return jwtAxios.post(`${API_SERVER_HOST}/Post/comments`, dto)
        .then(response => console.log(response.data))
        .catch(response => console.log(response.data))
}

export const getComment = (articleId) =>{
    return axios.get(`${API_SERVER_HOST}/Get/comments/${articleId}`)
        .then(response => response.data)
        .catch(response => console.log(response.data))
}

export const getIsLike = (articleId) =>{
    return jwtAxios.post(`${API_SERVER_HOST}/Post/isLike/${articleId}`)
    .then(response => response.data)
    .catch(error => console.log(error) )
}