import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { join } from '../../service/joinApi';
import { login } from "../../service/api.jsx";
import { saveToken } from "../../store/MemberSlice.js";
import { useDispatch } from "react-redux";
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
    const [titleMessage, setTitleMessage] = useState('이메일을 입력해주세요');
    const navigate = useNavigate();

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
            setTitleMessage("비밀번호를 입력해 주세요");
        } else if (name === 'checkPassword' && isPasswordMatching) {
            setTitleMessage("닉네임을 입력해 주세요");
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f0f0f0',
            }}
        >
            <Typography variant="h4" gutterBottom>
                {titleMessage}
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    label="이메일"
                    variant="outlined"
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
                            variant="outlined"
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
                            variant="outlined"
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
                        variant="outlined"
                        name="nickName"
                        value={formData.nickName}
                        onChange={handleChange}
                    />
                )}
                <Button type="submit" variant="contained" color="primary" disabled={!isFormValid}>
                    냥가왈부 시작하기
                </Button>
            </Box>
        </Box>
    );
};

export default LoginFormComp;
