import React, { useEffect, useRef, useState } from 'react';
import { addComment } from '../../service/commentApi';
import { useSelector } from 'react-redux';
import useToast from '../../hooks/useToast.jsx'
import { Button } from '@mui/material';
import { display, margin } from '@mui/system';
import { MarginOutlined } from '@mui/icons-material';

const style = {
    width: '80%',
    height: '2.5em',
    resize: 'none',
    padding: '10px',
    fontSize: '12pt',
    overflow: 'hidden',
    borderRadius: '20px',
    margin:'0 auto'

}

const CommentResisterForm = ({ memberNickname, commentRef, articleId, parentId, setIsArticleSubmitted, isArticleSubmitted, handleExpandClick }) => {
    const token = useSelector(state => state.MemberSlice).token;
    const toast = useToast();
    
    const [comment, setComment] = useState('');

    const commentInput = (e) => {
        setComment(e.target.value)
    }

    const onSubmit = async () => {
        if ((token === undefined) || (token === null) || (token === '')) {
            
            toast("로그인 해 주세요!")
            
            
        }
        if (comment === '' || comment === null) {
            toast("댓글 내용을 입력하세요.")
        }

        const addDto = {
            articleId: articleId,
            ref: commentRef,
            parentId: parentId,
            content: comment
        }

        const response = await addComment(addDto)
        console.log(response)
        setComment('');
        setIsArticleSubmitted(!isArticleSubmitted);
        toast("댓글이 정상적으로 등록되었습니다.")
        handleExpandClick()
    }

    return (


        <>
                <div>@{memberNickname}님 에게 댓글</div>
                <div style={{ display: 'flex',textAlign:'center', margin:'0 auto' }}>
                    <textarea style={style} value={comment} rows={1} onChange={commentInput} placeholder={token === '' ? '로그인 해 주세요' : '댓글을 입력해 주세요'} />
                    <Button sx={{fontSize:'12pt'}} onClick={onSubmit} >등록</Button>
                </div>
          

        </>

    );
};

export default CommentResisterForm;