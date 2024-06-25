import axios from "axios";
import jwtAxios from "./jwtAxios.js";
import {url, urlNoPort} from "../utils/single.js";

const API_SERVER_HOST = `${url}`;

axios.defaults.withCredentials = true; // withCredentials 전역 설정
axios.defaults.baseURL = url;

const jsonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": `${urlNoPort}`,
}

axios.defaults.withCredentials = true; // withCredentials 전역 설정
axios.defaults.baseURL = API_SERVER_HOST;

    //mypage
    export const myPageProfile = (nickname) => {
        return jwtAxios.get(`${API_SERVER_HOST}/member/${nickname}`)
        .then(response => response.data)
        .catch((error) => {
            console.error(error);
            console.error(error.response);
            console.error(error.response.data);
            return error.response.data;
        });
    }

// 피드 보기
export const myPageFeed = async (nickname) => {
    try {
        console.log(nickname)
        const response = await jwtAxios.get(`${API_SERVER_HOST}/feed/${nickname}`);
        console.log('API 응답 데이터: === feed', response.data); // API 응답 데이터 확인
        return response.data;
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        if (error.response) {
            console.error('서버 응답 에러 데이터:', error.response.data); // 서버에서 반환한 에러 데이터 확인
            return error.response.data;
        }
        return { error: '네트워크 오류 또는 서버가 응답하지 않습니다.' };
    }
};


//피드 올리기
export const PostFeed = (dto, files) => {
    const formData = new FormData();

    // 파일을 배열로 처리하여 FormData에 추가
    files.forEach(file => {
        formData.append('files', file);
    });

    // 텍스트 데이터를 JSON 형태로 변환 후 Blob으로 만들어 FormData에 추가
    const request = JSON.stringify(dto);
    const blob = new Blob([request], { type: "application/json" });
    formData.append('request', blob);

    return jwtAxios.post(`${API_SERVER_HOST}/feed`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(response => response.data)
        .catch((error) => {
            console.error(error);
            throw error; // 에러를 호출한 곳으로 던짐
        });
};

export const profile = async (formData) => {
    try{
        const response = await jwtAxios.post(`${API_SERVER_HOST}/member/image`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    }catch (error) {
        console.error('Error:', error);
        throw new Error('프로필 이미지 변경 중 오류가 발생했습니다.');
    }
}

export const follow = async (nickname) => {
    try {
        const response = await jwtAxios.post(`${API_SERVER_HOST}/member/${nickname}`);
        return response.data; // 응답 객체의 데이터를 반환
    } catch (error) {
        console.error('Error:', error);
        throw new Error('팔로우 중 오류가 발생했습니다.');
    }
}
export const unfollow = async (nickname) =>{
    try{
        const response = await jwtAxios.delete(`${API_SERVER_HOST}/member/${nickname}`);
        return response.data; // 응답 객체의 데이터를 반환
    }catch (error) {
        console.error('Error:', error);
        throw new Error('언팔로우 중 오류가 발생');
    }
}

export const follower = async (nickname) => {
    try {
        const response = await jwtAxios.get(`${API_SERVER_HOST}/member/follower/${nickname}`);
        return response.data; // 응답 객체의 데이터를 반환
    } catch (error) {
        console.error('Error:', error);
        throw new Error(' 오류가 발생했습니다.');
    }
};
export const following = async (nickname) =>{
    try{
        const response = await jwtAxios.get(`${API_SERVER_HOST}/member/following/${nickname}`);
        return response.data; // 응답 객체의 데이터를 반환
    }catch (error) {
        console.error('Error:', error);
        throw new Error('오류가 발생했습니다.');
    }
}

export const setting = async() =>{
    try{
        const response = await jwtAxios.get(`${API_SERVER_HOST}/member/setting`);
        return response.data;
    }catch(error){
        console.error('Error:', error);
        throw new Error('오류가 발생했습니다.');
    }
}

//피드 상세
export const GetFeed = (id) => {

    return jwtAxios.get(`${API_SERVER_HOST}/feed/detail/${id}`)

    .then(response => response.data)
    .catch((error) => {
        console.error(error);
        console.error(error.response);
        console.error(error.response.data);
        return error.response.data;
    });


}
//피드 삭제
export const DeleteFeed = (id) => {
try{
return jwtAxios.delete(`${API_SERVER_HOST}/feed/detail/${id}`)
}catch(error){
    console.error('Error:', error);
    throw new Error('피드 삭제 오류가 발생했습니다.');
}

}


//성별 생일 추가
export const putOther = async (formData) => {
    console.log("폼데이터 =", formData)
    try{
        return jwtAxios.put(`${API_SERVER_HOST}/member/other`,formData)
        }catch(error){
            console.error('Error:', error);
            throw new Error('성별, 생일 입력 중 오류가 발생했습니다.');
        }
};

//비밀번호 수정
export const putPW = async (formData) => {
    console.log("폼데이터 =", formData)
    try{
        return jwtAxios.put(`${API_SERVER_HOST}/member/password`,formData)
        }catch(error){
            console.error('Error:', error);
            throw new Error('비밀번호 수정 중 오류가 발생했습니다.');
        }
};

//비밀번호 찾기
export const FindPW =(email) => {
    return axios.post(`${API_SERVER_HOST}/memberF/findPw`, {
        email: email,
    }, {
        headers: jsonHeaders
    })
        .catch((error) => {
            console.error(error);
            console.error(error.response.data);
            return error.response.data;
        });
}

//당근 좋아요 누른거
export const getCarrotLike = async () => {
    console.log("들어왔어요")
    try{
        return jwtAxios.get(`${API_SERVER_HOST}/carrot/like`)
        }catch(error){
            console.error('Error:', error);
            throw new Error('당근 좋아요 리스트 처리 중 오류가 발생했습니다.');
        }
};

//당근 좋아요 누른거
export const getMemberNickname = async () => {
    try{
        const res = await jwtAxios.get(`${API_SERVER_HOST}/member/nickname`);
        // console.log("[memberApi - getMemberNickname]닉네임 가져오기 ", res.data);
        return res.data;
    }catch(error){
        console.error('Error:', error);
        throw new Error('닉네임 가져오기 중 에러 발생');
    }
};