
import axios from "axios";
import jwtAxios from "./jwtAxios.js";
import { url } from "../utils/single.js";

const ARTICLE_API_BASE_URL = `${url}/article/list`;
//글 쓰기
const API_SERVER_HOST = url;

export const spamCheck = () => {
    return jwtAxios.get(`${API_SERVER_HOST}/api/articles/antiSpam`)
        .then(response => response)
        .catch(error => {
            if (error.response) {
               return error.response
            } else if (error.request) {
                // 요청이 전송되었으나 응답이 없었을 때
                console.log('No response received:', error.request);
            } else {
                // 요청을 설정하는 중에 오류가 발생했을 때
                console.log('Error message:', error.message);
            }
            console.log('Error config:', error.config);
        })
}

export const writeArticle = (formData) => {
    return jwtAxios.post(`${API_SERVER_HOST}/Post/article`, formData, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    }
    )
        .then(response => response.data)
        .catch(error => error.data)
}

//글 조회 단건
export const getArticleView = (articleId) => {
    return axios.get(`${API_SERVER_HOST}/articles/${articleId}`)
        .then(response => response.data.result.data)
        .catch(error => error.data)
}

//글 수정 조회
export const getUpdateArticle = (articleId) => {
    return jwtAxios.get(`${API_SERVER_HOST}/article/getUpdateArticle/${articleId}`)
        .then(response => response.data.result.data)
        .catch(error => error.data)
}

//글 수정
export const resistUpdateArticle = (formData, articleId) => {
    return jwtAxios.put(`${API_SERVER_HOST}/articles/update/${articleId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => console.log(response.data))
        .catch(error => console.log(error.data))
}
//글 좋아요
export const increaseLikeCount = (body) => {
    return jwtAxios.post(`${API_SERVER_HOST}/like`, body)
        .then(response => response.data)
        .catch(response => console.log(response.data))
}
//좋아요 취소
export const decreaseLikeCount = (articleId) =>{
    return jwtAxios.delete(`${API_SERVER_HOST}/like/${articleId}`)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}


class ArticleService {
    getArticleList(page, sort, dir, search, boardName) {
        //return axios.get(ARTICLE_API_BASE_URL);
        return axios.get(`${ARTICLE_API_BASE_URL}?page=${page}&sort=${sort}&dir=${dir}&where=${search}&boardName=${boardName}`)
        //return axios.get(`${ARTICLE_API_BASE_URL2}?articleTags=${where}`)
    }
}

export default new ArticleService();