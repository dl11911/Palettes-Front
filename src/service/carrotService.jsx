import axios from "axios";
import jwtAxios from "./jwtAxios";
import {url} from "../utils/single.js";

const CARROT_API_BASE_URL = `${url}/carrot`;

class carrotService {
    //리스트 출력
    getCarrotList(page, sort, dir, where) {
        return axios.get(`${CARROT_API_BASE_URL}/list?page=${page}&sort=${sort}&dir=${dir}&where=${where}`)
    }

    //글 작성
    postCarrotWrite(formData) {
        console.log("폼데이터 = ", Object.fromEntries(formData.entries()));
        return jwtAxios.post(`${CARROT_API_BASE_URL}/post`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }
        )
            .then(response => response.data)
            .catch(error => error.data)
    }

    //검색 기능
    getSearchList(keyword) {
        return axios.get(`${CARROT_API_BASE_URL}/search?keyword=${keyword}`)
    }

    //상세 정보
    getCarrotDetails(id) {
        return axios.get(`${CARROT_API_BASE_URL}/list/${id}`)
    }

    //글 수정
    putCarrotUpdate(formData, id) {
        console.log("폼데이터 = ", Object.fromEntries(formData.entries()));
        return jwtAxios.post(`${CARROT_API_BASE_URL}/update/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
            .then(response => response.data)
            .catch(error => error.data)
    }

    //글 삭제
    deleteCarrot(id) {
        return axios.delete(`${CARROT_API_BASE_URL}/delete/${id}`)
    }

    //글쓴이와 로그인 사용자가 같은지 확인
    checkCarrotId(id) {
        return jwtAxios.get(`${CARROT_API_BASE_URL}/check/${id}`)
    }

    //회원 별 거래 리스트 출력
    getUserList() {
        return jwtAxios.get(`${CARROT_API_BASE_URL}/postList`)
    }

    //좋아요 등록 & 삭제
    postLike(id) {
        return jwtAxios.post(`${CARROT_API_BASE_URL}/like/${id}`)
    }
    
    //좋아요 확인
    getLike(id) {
        return jwtAxios.get(`${CARROT_API_BASE_URL}/likeState/${id}`)
    }

}

export default new carrotService();