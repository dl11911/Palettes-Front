import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button, Grid, IconButton, Link } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useNavigate } from 'react-router-dom';
import { myPageProfile, myPageFeed, follow, unfollow } from '../../service/memberApi';
import MyPagePetImgList from "../pet/MyPagePetImgList.jsx";


const MyPageComp = ({ nickname }) => {
    const [user, setUser] = useState({ nickname: '', img: null, following: 0, followers: 0, feeds: 0, memberId: '', followTF: false});
    const [feeds, setFeeds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            
            try {
                const data = await myPageProfile(nickname);
                setUser({
                    nickname: data.nickname,
                    img: data.img,
                    following: data.following || 0,
                    followers: data.follower || 0,
                    memberId: data.memberId,
                    feeds: data.feed || 0,
                    followTF: data.followTF
                });
                console.log("현재 나 닉네임=="+data.memberId );
                console.log("지금 들어가있는 프로필 닉네임=="+nickname)
                console.log("팔로우 여부 입니다요!!"+ data.followTF);
                console.log("팔로우 여부 입니다요!!"+ user.followTF);
            
            } catch (error) {
                console.error('프로필 정보를 불러오는 중 오류 발생:', error);
            }
            
        };
        
        const fetchFeedData = async () => {
            try {
                const data = await myPageFeed(nickname);
                console.log('feed 응답 데이터:??', data);
                setFeeds(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('피드 정보를 불러오는 중 오류 발생:', error);
            }
        };

        fetchProfileData();
        fetchFeedData();
    }, [nickname]);

    const handleFollowingClick = () => {
        navigate(`/member/following/${user.nickname}`);
    };

    const handleFollowerClick = () => {
        navigate(`/member/follower/${user.nickname}`);
    };

    const navigateBack = () => {
        navigate('/');
    };

    const navigateToSettings = () => {
        navigate('/member/setting'); 
    };

    const handleFloatingButtonClick = () => {
        navigate(`/member/feed`);
    };
    const profileImgButton = () => {
        navigate(`/member/image/profile`);
    }
    const followButtonClick = async () => {
        try {
            const response = await follow(user.nickname);
            console.log("팔로우 성공:", response);
            window.location.reload();
            
        } catch (error) {
            console.error("팔로우 실패:", error);
        }
    };
    const unfollowButtonClick = async () => {
        try {
            const response = await unfollow(user.nickname);
            window.location.reload();
        } catch (error) {
            
            console.error("언팔로우 실패:", error);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={navigateBack}>
                    <ChevronLeftIcon />
                </IconButton>
                <Typography variant="h6">{user.nickname}</Typography>
                <IconButton onClick={navigateToSettings}>
                <MoreVertIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={`https://kr.object.ncloudstorage.com/palettepets/member/Profile/${user.img}`} sx={{ width: 80, height: 80, mr: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
                        <Typography>{user.feeds}</Typography>
                        <Typography>게시물</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
                        <Link onClick={handleFollowingClick}>
                            {user.following}
                            <Typography>팔로잉</Typography>
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
                        <Link onClick={handleFollowerClick}>
                            {user.followers}
                            <Typography>팔로워</Typography>
                        </Link>
                    </Box>

                </Box>
            </Box>
            
            {nickname === user.memberId ? (
                <>
                <Button
                    onClick={profileImgButton}
                >
                    프로필 이미지 변경</Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFloatingButtonClick}
                >
                  피드 작성하기
                </Button>
              </>
            ) : (
                    <>
                {user.followTF ? (
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={followButtonClick}
                    >
                    팔로우
                    </Button>
                ) : (
                    <Button
                    variant="contained"
                    color="secondary"
                    onClick={unfollowButtonClick}
                    >
                    언팔로우
                    </Button>
                )}
                </>
            )}
            <MyPagePetImgList />
            {feeds.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', border: '1px solid #ccc', borderRadius: 2, mt: 2 }}>
                    <Typography variant="body1" align="center">
                        피드가 존재하지 않습니다. 피드 작성하기를 눌러 만들어보세요.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {feeds.map((feed, index) => (
                        <Grid item xs={4} key={index}>
                            <Box
                                component="img"
                                src={`https://kr.object.ncloudstorage.com/palettepets/feed/img/${feed.img}`}
                                alt={`feed-${index}`}
                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onClick={() => navigate(`/member/feed/detail/${feed.feedId}`)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            
        </Box>
    );
};

export default MyPageComp;
