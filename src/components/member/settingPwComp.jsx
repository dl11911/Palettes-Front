import React, { useState } from 'react';
import { Box, Button, TextField, Typography,IconButton } from '@mui/material';
import { putPW } from '../../service/memberApi'; // putPW 함수가 정의된 파일의 경로에 맞게 수정하세요
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@!%*#?&]).{8,16}$/;
    return passwordRegex.test(password);
};

const SettingPwComp = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: '',
        checkPassword: '',
    });
    const handleSave = async () => {
        if (!validatePassword(password)) {
            setError('비밀번호는 8~16자, 영문자, 숫자, 특수문자를 포함해야 합니다.');
            return;
        }
        if (password !== confirmPassword) {
            setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        try {
            setFormData({
                password: password,
                checkPassword: confirmPassword
            })
            const response = await putPW(formData);
            console.log("response",response);
            if (response.data=="비밀번호가 수정되었습니다.") {
                alert('비밀번호가 성공적으로 변경되었습니다.');
                navigate(-1);
            } else {
                const errorMessage = await response.text();
                setError(` ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('비밀번호 변경 중 오류가 발생했습니다.');
        }
    };
    const navigateBack = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={navigateBack}>
                    <ChevronLeftIcon />
                </IconButton>
                <Typography variant="h6" align="center" gutterBottom>
                비밀번호 변경
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                
            </Typography>
            </Box>
            
            <TextField
                label="비밀번호"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error}
                helperText={error && ' '}
            />
            <TextField
                label="비밀번호 확인"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!error}
                helperText={error}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSave}
            >
                저장
            </Button>
        </Box>
    );
};

export default SettingPwComp;
