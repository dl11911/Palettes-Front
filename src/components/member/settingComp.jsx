import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Link, IconButton } from '@mui/material';
import { setting } from '../../service/memberApi';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={navigateBack}>
                <ChevronLeftIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>내 정보</Typography>
                <Box sx={{ width: 48 }} /> {/* 아이콘 버튼의 너비와 동일한 크기의 빈 박스 */}
            </Box>
            <Typography variant="h5" gutterBottom>
                {userInfo.nickname}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {userInfo.email}
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <Link onClick={() => handleNavigation('/member/setting/other')} sx={{ mb: 1 }}>회원정보수정</Link>
                <Link onClick={() => handleNavigation('/member/setting/password')} sx={{ mb: 1 }}>비밀번호 변경</Link>
                <Link onClick={() => handleNavigation('')} sx={{ mb: 1 }}>주소지 입력</Link>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <Link onClick={() => handleNavigation('')} sx={{ mb: 1 }}>게시판 내가 쓴 글</Link>
                <Link onClick={() => handleNavigation('')} sx={{ mb: 1 }}>게시판 내가 쓴 댓글</Link>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <Link onClick={() => navigate(`/carrot/myCarrot`)} sx={{ mb: 1 }}>당근장터 쓴 글</Link>
                <Link onClick={() => handleNavigation('/member/carrot/like')} sx={{ mb: 1 }}>당근장터 좋아요</Link>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Link onClick={() => handleNavigation('/logout')}>로그아웃</Link>
        </Box>
    );
};

export default SettingCom;
