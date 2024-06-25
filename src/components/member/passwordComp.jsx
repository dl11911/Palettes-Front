import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { FindPW } from '../../service/memberApi'; 
import { useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const PasswordComp = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const handleSendEmail = async () => {
        setError('');
        setSuccessMessage('');
        setApiError('');

        if (!email) {
            setError('이메일을 입력해주세요.');
            return;
        }

        try {
            const response = await FindPW(email);
            if (response.result === 'success') {
                setSuccessMessage('비밀번호 재설정 이메일이 발송되었습니다.');
                navigate('/');
            } else {
                setApiError(`오류: ${response.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setApiError('비밀번호 찾기 요청 중 오류가 발생했습니다.');
        }
    };

    const navigateBack = () => {
        navigate(-1);
      };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={navigateBack}>
                <ChevronLeftIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>비밀번호 찾기</Typography>
                <Box sx={{ width: 48 }} /> {/* 아이콘 버튼의 너비와 동일한 크기의 빈 박스 */}
            </Box>
            <TextField
                label="이메일"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error}
            />
            {successMessage && (
                <Typography color="primary" variant="body2" align="center" sx={{ mt: 2 }}>
                    {successMessage}
                </Typography>
            )}
            {apiError && (
                <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
                    {apiError}
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSendEmail}
            >
                이메일 보내기
            </Button>
        </Box>
    );
};

export default PasswordComp;
