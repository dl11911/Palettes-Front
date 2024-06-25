import axios from "axios";

const API_SERVER_HOST = `http://localhost:8080`;

const jsonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": `http://localhost:3000`,
}

axios.defaults.withCredentials = true; // withCredentials 전역 설정
axios.defaults.baseURL = API_SERVER_HOST;

// joinApi.js
export const join = async (formData) => {
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