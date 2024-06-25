import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../utils/single.js';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ArticleDelete = (props) => {
    const { articleId, modalHandleClose } = props
    const navigate = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        customClass: {
            container: 'toastContainer',
        }
    })

    const toastUp = (message) => {
        Toast.fire({
            icon: 'success',
            title: message,
            width: 450
        })
    }

    const onDelete = () => {

        axios.delete(`${url}/Delete/${articleId}`)
            .then(response => {

                toastUp("삭제 되었습니다.")
                navigate('/board?sort=createdAt')

            })
            .catch(error => {
                toastUp("삭제 실패하였습니다.")
            })


    }

    return (
        <>
            <Box sx={style}>
                <div>선택한 글을 삭제하시겠습니까?</div>
                <br />
                <Button variant="outlined" color="error" onClick={onDelete}>삭제</Button>
                <Button onClick={modalHandleClose}>취소</Button>
            </Box>
        </>
    );
};

export default ArticleDelete;