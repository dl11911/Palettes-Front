import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Link, IconButton } from '@mui/material';
import { setting } from '../../service/memberApi';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateIcon from '@mui/icons-material/Create';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CommentIcon from '@mui/icons-material/Comment';
import '../../styles/loginPage/setting.css';

const SettingCom = () => {
    const [userInfo, setUserInfo] = useState({ nickname: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await setting();
                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchData();
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };
    const navigateBack = () => {
        navigate(`/member/${userInfo.nickname}`);
      };
    return (
        <Box sx={{ p: 3 }} className="my-page-list-container">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={navigateBack}>
                <ChevronLeftIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color:'black' }}>내 정보</Typography>
                <Box sx={{ width: 48 }} /> {/* 아이콘 버튼의 너비와 동일한 크기의 빈 박스 */}
            </Box>
            <Typography className="my-page-list-title" sx={{color:'black'}} variant="h5" gutterBottom>
                {userInfo.nickname}
            </Typography>
            <Typography variant="body1" sx={{color:'black'}} gutterBottom>
                {userInfo.email}
            </Typography>
            <Divider sx={{ my: 2 }} />

                <h2 style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>나의 정보</h2>   
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' , p: 2 }}>
                    <Link className="my-page-list-link" onClick={() => handleNavigation('/member/setting/other')}><AccountCircleIcon /> 회원정보수정</Link>
                    <Link className="my-page-list-link" onClick={() => handleNavigation('/member/setting/password')} ><VpnKeyIcon /> 비밀번호 변경</Link>
                </Box>
                <Divider sx={{ my: 2 }} />

                <h2 style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>나의 거래</h2>   
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' , p: 2 }}>
                    <Link className="my-page-list-link" onClick={() => navigate(`/carrot/myCarrot`)} sx={{ mb: 1 }}><ShoppingBasketIcon /> 당근장터 쓴 글</Link>
                    <Link className="my-page-list-link" onClick={() => handleNavigation('/member/carrot/like')} sx={{ mb: 1 }}><FavoriteIcon /> 당근장터 좋아요</Link>
                </Box>
                <Divider sx={{ my: 2 }} />

        </Box>
    );
};

export default SettingCom;