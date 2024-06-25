import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { follower } from '../../service/memberApi'; // API 호출 함수 경로에 맞게 수정
import { Box, Typography, Avatar, Button, Grid, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const FollowerComp = ({ nickname }) => {
  const navigate = useNavigate();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await follower(nickname); // API 호출
        console.log('Fetched data:', data); // 응답 데이터 구조 확인
        // 데이터 구조를 확인하여 id가 고유한지 확인
        data.forEach(follower => console.log(follower.id));
        setFollowers(data);
      } catch (error) {
        console.error('Error fetching followers:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [nickname]);

  const navigateBack = () => {
    navigate(`/member/${nickname}`);
  };

  const followingBTN = () => {
    navigate(`/member/following/${nickname}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={navigateBack}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>{nickname}</Typography>
        <Box sx={{ width: 48 }} /> {/* 아이콘 버튼의 너비와 동일한 크기의 빈 박스 */}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button variant="contained" sx={{ marginRight: 1 }}>팔로워</Button>
        <Button variant="contained" onClick={followingBTN}>팔로잉</Button>
      </Box>

      {followers.length === 0 ? (
        <p style={{ textAlign: 'center' }}>{nickname}님을 팔로워 하고있는 친구가 없습니다.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {followers.map(follower => (
            <li
              key={follower.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '10px 0',
                border: '1px solid gray', // 회색 테두리 추가
                padding: '10px', // 패딩 추가
                borderRadius: '10px' // 둥근 테두리 추가
              }}
              onClick={() => navigate(`/member/${follower.nickname}`)}
            >
              <img
                src={`https://kr.object.ncloudstorage.com/palettepets/member/Profile/${follower.profile}`}
                style={{ borderRadius: '50%', marginRight: '10px', width: '50px', height: '50px' }} // 이미지 크기 설정
              />
              <span>{follower.nickname}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowerComp;
