import jwtAxios from '../service/jwtAxios.js';
import {url} from './single.js';

// 매개변수 = member PK
const connectChat = (e) => {
    jwtAxios.get(`${url}/api/chat?id=${e}`).then((response) => {
        console.log(response);
        const encodeNickname = btoa(response.data.nickname); // 본인 닉네임
        const redirectUrl = `http://223.130.156.241/chat/${response.data.roomId}-${encodeNickname}`;
        window.location.href = redirectUrl;
    }).catch((error) => {
        console.error(error);
    });
}

export default connectChat;