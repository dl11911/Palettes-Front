import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Alert, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { join } from '../../service/joinApi';
import { login } from "../../service/api.jsx";
import { saveToken } from "../../store/MemberSlice.js";
import { useDispatch } from "react-redux";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const LoginFormComp = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        checkPassword: '',
        nickName: ''
    });
    const [emailValid, setEmailValid] = useState(false);
    const [error, setError] = useState('');
    const [titleMessage, setTitleMessage] = useState('이메일을');
    const navigate = useNavigate();


    const navigateBack = () => {
        navigate(-1);
      };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(email));
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@!%*#?&]).{8,16}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data: ", formData);
        try {
            const response = await join(formData); // 여기서 join 함수를 사용
            const responseData = await response.text();
            console.log("Response: ", responseData);

            if (response.ok) {
                const token = await login({ username: formData.email, password: formData.password });
                dispatch(saveToken(token));

                console.log("토큰= "+token);
                navigate({ pathname: '/' }, { replace: true });
            } else {
                setError(responseData || '회원가입에 실패하였습니다.');
            }
        } catch (err) {
            console.log(err);
            setError('서버와의 통신에 문제가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const isPasswordMatching = formData.password === formData.checkPassword;
    const isPasswordValid = validatePassword(formData.password);
    const isFormValid = emailValid && formData.password && isPasswordMatching && isPasswordValid && formData.nickName;

    const handleBlur = (e) => {
        const { name } = e.target;
        if (name === 'email' && emailValid) {
            setTitleMessage("비밀번호와 비밀번호 확인을");
        } else if (name === 'checkPassword' && isPasswordMatching) {
            setTitleMessage("닉네임을");
        }
    };

    return (
        <>
            <Box sx={{ padding: 3 }}>
                {/* 빈 박스 */}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={navigateBack}>
                    <ChevronLeftIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 1, textAlign: 'center' }}></Typography>
                <Box sx={{ width: 48 }} /> {/* 아이콘 버튼의 너비와 동일한 크기의 빈 박스 */}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    paddingBottom: '80px', // 버튼이 고정될 공간 확보
                }}
            >
                <Box sx={{ textAlign: 'left', margin: '16px', marginBottom: 4, color: 'black' }}>
                    <Typography variant="h3">
                        {titleMessage}
                    </Typography>
                    <Typography variant="h3">
                        입력해 주세요.
                    </Typography>
                </Box>
    
                {error && <Alert severity="error">{error}</Alert>}
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 5, // 간격 추가
                        '& > *': { m: 1, width: 'calc(100% - 32px)', maxWidth: '600px' }, // 여유분을 남기고 넓게 설정
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        label="이메일"
                        variant="standard"
                        name="email"
                        value={formData.email}
                        onChange={(e) => {
                            handleChange(e);
                            validateEmail(e.target.value);
                        }}
                        onBlur={handleBlur}
                        error={!emailValid && formData.email !== ''}
                        helperText={!emailValid && formData.email !== '' ? "유효한 이메일을 입력해주세요." : ""}
                    />
                    {emailValid && (
                        <>
                            <TextField
                                label="비밀번호"
                                variant="standard"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!isPasswordValid && formData.password !== ''}
                                helperText={!isPasswordValid && formData.password !== '' ? "비밀번호는 영문자, 숫자, 특수문자를 포함한 8~16자리여야 합니다." : ""}
                            />
                            <TextField
                                label="비밀번호 확인"
                                variant="standard"
                                type="password"
                                name="checkPassword"
                                value={formData.checkPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={formData.checkPassword !== '' && !isPasswordMatching}
                                helperText={formData.checkPassword !== '' && !isPasswordMatching ? "비밀번호가 일치하지 않습니다." : ""}
                            />
                        </>
                    )}
                    {isPasswordMatching && isPasswordValid && formData.password && (
                        <TextField
                            label="닉네임"
                            variant="standard"
                            name="nickName"
                            value={formData.nickName}
                            onChange={handleChange}
                        />
                    )}

                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '16px 0',
                            // boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)', // 그림자 효과 추가
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!isFormValid}
                            sx={{
                                backgroundColor: 'black', // 배경색 검정
                                width: '90%', // 모바일 환경에 맞춘 너비
                                maxWidth: '400px', // 최대 너비 설정
                                borderRadius: '15px', // 라운드 값 설정
                            }}
                        >
                            냥가왈부 시작하기
                        </Button>
                    </Box>

                </Box>
                
            </Box>
        </>
    );
    
    
};
export default LoginFormComp;
