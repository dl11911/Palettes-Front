import React, { useEffect, useState } from 'react';

import SelectBoard from './atoms/SelectBoard';
import useForm from '../../../hooks/useForm';
import UserMakeTags from './atoms/UserMakeTags';
import InputTitle from './atoms/InputTitle';
import InputContent from './atoms/InputContent';
import ImageUpload from './atoms/ImageUpload';
import { Button, CircularProgress } from '@mui/material';
import { writeArticle, spamCheck } from '../../../service/ArticleService.jsx'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import useToast from '../../../hooks/useToast.jsx';


const initialForm = {

    boardName: 'FREEBOARD',
    articleHead: '',
    articleTags: [],
    title: '',
    content: ''
}

const Overlay = styled.div`
  display: ${({ loading }) => (loading === 'true' ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ArticleWriteForm = () => {

    const [form, onChange, onInput, reset] = useForm(initialForm);
    const [imgFiles, setImgFiles] = useState([]);
    const [previewList, setPreviewList] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

   

    const navigate = useNavigate();

    const validate = (form) => {
        const { articleHead, title, content } = form

        if (articleHead === '' || articleHead === null) {
            toast("머릿말을 선택해주세요.")
            return false;
        } else if (title === '' || title === null) {
            toast("제목을 입력해주세요")
            return false;
        } else if (content === '' || content === null) {
            toast("내용을 입력해주세요")
            return false;
        } else {
            return true;
        }
    }

    const onSubmit = async (e) => {
       
        if(validate(form)){
            
            const response = await spamCheck();

            if (response.status === 400) {

                const writeDate = response.data;
                const currentDate = Date.now();
                const resultDate = (writeDate - currentDate) / 1000;

                toast(resultDate + " 초 이후에 글 작성이 가능합니다.")

            }
            else {

                const formData = new FormData();
                Object.values(imgFiles).map((item, index) => {
                    formData.append('files', item);
                });
                alert(JSON.stringify(form));
                const blob = new Blob([JSON.stringify(form)], { type: "application/json" });
                formData.append('dto', blob);

                setLoading(true);

                await writeArticle(formData);

                setLoading(false);

                toast("정상적으로 등록되었습니다.")

                navigate(-1);
            }
        }
      
    }

    const onReset = () => {

        reset(initialForm)
        setImgFiles([]);
        setPreviewList([]);

    }

    return (


        <div style={{margin:'40px auto'}}>
            <Overlay loading={loading.toString()}>

                <Box sx={{ display: loading ? 'flex' : 'none' }}>
                    <CircularProgress sx={{fontSize:'30pt'}} />
                </Box>
            </Overlay>

            <SelectBoard boardName={form.boardName} onChange={onChange} />
            <UserMakeTags articleTags={form.articleTags} onInput={onInput} />
            <InputTitle boardName={form.boardName} articleHead={form.articleHead} title={form.title} onChange={onChange} onInput={onInput} />
            <InputContent content={form.content} onChange={onChange} />
            <ImageUpload previewList={previewList} setPreviewList={setPreviewList} imgFiles={imgFiles} setImgFiles={setImgFiles} />

            <Button onClick={() => onSubmit()}>작성 완료</Button>
            <Button onClick={onReset}>다시 쓰기</Button>

        </div>

    );

};

export default ArticleWriteForm;