import axios from "axios";
import {url, urlNoPort} from "../utils/single.js";

const API_SERVER_HOST = url;

const jsonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": `${urlNoPort}`,
}


axios.defaults.withCredentials = true; // withCredentials 전역 설정
axios.defaults.baseURL = API_SERVER_HOST;

// joinApi.js
export const join = async (formData) => {
    console.log("시작시작")
    try {
        const response = await fetch(`${API_SERVER_HOST}/join`, { // 서버의 실제 URL로 변경
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        console.log("api 호출 완료");
        return response; // 응답 객체 자체를 반환
    } catch (error) {
        console.error('Error:', error);
        throw new Error('가입 중 오류가 발생했습니다.');
    }
};