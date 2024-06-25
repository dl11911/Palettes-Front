import CssBaseline from "@mui/material/CssBaseline";
import { Box, Button, Container, Modal } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import './ImageWithCloseIcon.css';
import ImageEdit from './ImageEdit';
import { useParams } from "react-router-dom";
import { width } from "@mui/system";

//모달창 css
const style = {
    position: 'absolute',
    width:'380px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ImageUpload = ({ previewList,setPreviewList,imgFiles, setImgFiles }) => {
    //imgfiles -> Object Storage 및 DB 저장용 , 배열
    //previewList -> 미리보기 및 편집용 , 배열

    //trigger 사용을 대체할 ref -> icon 클릭시 파일 열림
    const imgRef = useRef();

    const onCamera = () => {
        imgRef.current.click();
    }

    // 사진 편집 모달창 열기 / 닫기
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        previewList.length !== 0 ? setOpen(true) : alert('사진을 등록해 주세요')
    };
    const handleClose = () => setOpen(false);


    //이미지 업로드 
    const onImageInput = (e) => {

        if ((previewList.length + e.target.files.length) > 4) {
            alert('최대 개수는 3개 입니다.')
        } else {

            // 여러개의 파일 선택 -> Array로 저장
            const uploadFiles = Array.from(e.target.files)

            //URL 을 만들어 imgArray에 저장 -> 미리보기용 이미지
            var imgArray = [...previewList];

            //서버로 보낼 filesArray
            var filesArray = [];

            uploadFiles.map((item, index) => {

                const objectURL = URL.createObjectURL(item);

                //중복된 이미지 거르기
                // const isDuplicate = files.some(img => img.name === item.name);
                if (true) {
                    imgArray.push(objectURL);
                    filesArray.push(item);
                } else {
                    alert('동일한 사진은 1장씩만 가능합니다.' + item.name)
                }
            })

            // 미리보기로 뿌려줄 이미지
            setPreviewList(imgArray);
            // 서버로 보낼 이미지
            setImgFiles(imgFiles.concat(filesArray))
        }

        e.target.value = '';
        // 마지막으로 저장된 파일의 value 삭제
        // 이미지 편집시 지우는 파일이 e.target.value에 남아있는 값과 같으면 올라가지 않는다.
    }

    const deleteChoiceImage = (choiceIndex) => {

        if (window.confirm("삭제하시겠습니까?")) {
          const deleteUrl = previewList[choiceIndex]
          const newImgList = previewList.filter((item, index) => index !== choiceIndex);
          const newFiles = imgFiles.filter((item, index) => index !== choiceIndex);
        
          setPreviewList(newImgList)
          setImgFiles(newFiles)
        
          window.URL.revokeObjectURL(deleteUrl);
          // 메모리 누수 방지
        
          if (previewList.length === 1) {
            handleClose()
          }
        }
      }

    return (

        <Container sx={{ marginTop: 2 }}>

            <span>사진 추가 (최대 4장)</span>

            <Button onClick={handleOpen}>사진 편집</Button>

            <Box sx={{ minWidth: 200, display: 'block', marginTop: 2 }}>

                {

                    previewList.map((item, index) =>
                        <div className='image-container ' key={index}>
                            <img src={item} alt={index} className="image" width='80' height='80' />
                        </div>
                    )

                }
                <div className='image-container inputImage-container'>
                    <AddPhotoAlternateOutlinedIcon onClick={onCamera} sx={{ width: '80px', height: '80px', margin: '0', display: 'block' }} />
                </div>

            </Box>

            <input type="file" name="img[]" multiple='multiple' ref={imgRef} style={{ visibility: 'hidden' }}
                onChange={onImageInput}
            />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ImageEdit previewList={previewList} setPreviewList={setPreviewList} imgFiles={imgFiles} setImgFiles={setImgFiles} deleteChoiceImage={deleteChoiceImage}  />
                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={handleClose} >편집 완료</Button>
                    </div>
                </Box>
            </Modal>

        </Container>

    );
};

export default ImageUpload;