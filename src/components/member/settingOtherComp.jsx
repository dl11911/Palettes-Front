import React, { useState } from 'react';
import { putOther } from '../../service/memberApi'; // putOther 함수의 경로를 맞춰주세요
import { Box, Typography, Button, Grid, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate, useParams } from 'react-router-dom';

const SettingOtherComp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    birth: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const navigateBack = () => {
    navigate('/member/setting');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putOther(formData);
      console.log('Response:', response);
      alert('성별과 생일이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Error:', error);
      alert('성별과 생일 입력 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={navigateBack}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6"></Typography>
        <IconButton ><Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>저장</Button></IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" component="label" htmlFor="gender">성별</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={formData.gender === 'M'}
                    onChange={handleChange}
                    required
                  />
                  남성
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    checked={formData.gender === 'F'}
                    onChange={handleChange}
                    required
                  />
                  여성
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="O"
                    checked={formData.gender === 'O'}
                    onChange={handleChange}
                    required
                  />
                  기타
                </label>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" component="label" htmlFor="birth">생일</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <input
                type="date"
                name="birth"
                id="birth"
                value={formData.birth}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          
        </form>
      </Box>
    </div>
  );
};

export default SettingOtherComp;
