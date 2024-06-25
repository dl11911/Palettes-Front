import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Avatar } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { profile } from '../../service/memberApi'; // profile API 가져오기
import { useNavigate } from 'react-router-dom';

const ImageUploadComp = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
        }
    };

    const handleSaveClick = async () => {
        if (!selectedImage) {
            toast.error("이미지를 선택하세요!");
            return;
        }

        const formData = new FormData();
        formData.append('files', selectedImage);
        console.log(formData);

        try {
            const response = await profile(formData); // profile API 호출
            navigate(-1);
        } catch (error) {
            console.error('이미지 저장 실패:', error);
        }
    };

    return (
        <Box>
            <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="upload-button"
                ref={fileInputRef}
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSaveClick} 
                style={{ marginTop: '20px' }}
            >
                저장하기
            </Button>
            {preview && (
                <Box mt={2}>
                    <Avatar
                        src={preview}
                        alt="미리보기"
                        sx={{ width: 200, height: 200 }}
                    />
                </Box>
            )}
            
        </Box>
    );
};

export default ImageUploadComp;
