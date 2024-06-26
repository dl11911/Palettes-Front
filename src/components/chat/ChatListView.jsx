import React, { useEffect, useState } from 'react';
import "../../styles/board/BoardItem.css"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {url} from '../../utils/single';
import { useSelector } from 'react-redux';
import jwtAxios from '../../service/jwtAxios';
import connectChat from '../../utils/connectChat';


const ChatListView = () => {
    const [chatList, setChatList] = useState([]);
    const token = useSelector((state) => state).MemberSlice.token;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        try {
            const result = await jwtAxios.get(`${url}/api/chatList`)
            .then(res => res.data)
            .catch(err => {
                console.error(err);
                return err.response.data;
            });
            console.log("List result :: ",result);
            setChatList(result);
        } catch (e) {
            console.error(e);
        }
    }
    const requestChat = (e) =>() => {
        if (token === '') {
            console.log("token is on")
            alarm();
        } else {
            connectChat(e);
        }
    }

    return (
        <>
            {chatList.map((chat) => (
                <div className="Item-container" onClick={requestChat(chat.userId)}>
                    <div className="Item-content chatting">
                        <div className="Item-text">
                                <div className="Item-info">
                                    <h1>{chat.nickname}</h1>
                                    <ChatBubbleOutlineIcon sx={{fontSize:'16pt'}}/>
                                </div>
                            <div
                            >안읽은 메세지 : {chat.count}</div>
                        </div>
                    </div>
                    <hr/>
                </div>
            ))}
        </>
    );
}

export default ChatListView;