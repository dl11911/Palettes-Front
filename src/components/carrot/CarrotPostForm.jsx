import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/carrot/CarrotForm.css';
import '../../styles/carrot/CarrotError.css'
import carrotService from '../../service/carrotService';
import useForm from '../../hooks/useForm';
import { Box, Button, Grid, TextField, Typography, IconButton  } from '@mui/material';
import { formatDate } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ImageUpdate from './ImageUpdate';
import img from '../../image/icon-image.png'


const CarrotPostForm = () => {
  const navigate = useNavigate();

  const [reset] = useForm(form);

  const [carrotTitle, setCarrotTitle] = useState('');
  const [carrotContent, setCarrotContent] = useState('');
  const [carrotTag, setCarrotTag] = useState('');
  const [carrotPrice, setCarrotPrice] = useState('');
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFiles(files);

    const newPreviews = files.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviews(prev => [...prev, reader.result]);
        };
    });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("핸들 서밋")
    const validationErrors = {};
        if (!carrotTitle) validationErrors.carrotTitle = '제목을 적어주세요.';
        if (!carrotContent) validationErrors.carrotContent = '설명을 적어주세요.';
        if (!carrotTag) validationErrors.carrotTag = '거래 방식을 선택해주세요.';
        if (!carrotPrice) validationErrors.carrotPrice = '가격을 입력해주세요.';

        setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0) {
      const formData = new FormData();

      formData.append('carrotTitle', carrotTitle);
      formData.append('carrotContent', carrotContent);
      formData.append('carrotTag', carrotTag);
      formData.append('carrotPrice', carrotPrice);
      files.forEach((imgList) => {
        formData.append('files', imgList);
      });
      console.log(formData.get(carrotContent))
      console.log(formData.get(files));

      try {
          const result = await carrotService.postCarrotWrite(formData);
          if (result.status === 200) {
            alert('글 작정에 실패했습니다. 다시 시도해주세요.');
          } else {
            alert('글 등록에 성공했습니다.')
            navigate('/carrot/list');
            window.location.reload();
          }
          console.log("폼데이터2@= ", Object.fromEntries(formData.entries()));
        } catch (error) {
          // 글 작성 실패 시 오류 처리 로직 작성
          alert('글 작정에 실패했습니다. 다시 시도해주세요.');
          console.error('Error writing carrot:', error);
        }
      }
    };

    const handleCancel = () => {
      navigate('/carrot/list'); // 이전 페이지로 이동
    };  

  const clearError = (field) => {
    setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
};

    return (
        <form className="write-post-form" onSubmit={handleSubmit}>
            <h2 >내 물건 팔기 📃</h2>
        <div className="form-group">
          <label style={{textAlign: 'left'}}>제목</label>
          <input
            type="text"
            id="carrotTitle"
            value={carrotTitle}
            onChange={(event) => {setCarrotTitle(event.target.value); clearError('carrotTitle');}}
            placeholder="제목을 입력하세요"
            className={errors.carrotTitle ? 'input-error' : ''}
            style={{backgroundColor : 'white', color:'black'}}
          />
                {errors.carrotTitle && (
                    <div className="error">
                        <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
                        {errors.carrotTitle}
                    </div>
                )}        
        </div>

        <div className="form-group">
          <label style={{textAlign: 'left'}}>설명</label>
          <textarea
            id="carrotContent"
            value={carrotContent}
            onChange={(event) => {setCarrotContent(event.target.value); clearError('carrotContent');}}
            placeholder="상품 설명을 입력하세요"
            className={errors.carrotContent ? 'input-error' : ''}
            style={{backgroundColor : 'white', color:'black'}}
          ></textarea>
                {errors.carrotContent && (
                    <div className="error">
                        <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
                        {errors.carrotContent}
                    </div>
                )}        
        </div>

        <div className="form-group">
          <label style={{textAlign: 'left'}}>거래 방식</label>
          <select id="carrotTag" 
            value={carrotTag} 
            onChange={(event) => {setCarrotTag(event.target.value); clearError('carrotTag'); }}
            className={errors.carrotTag ? 'input-error' : ''}
            style={{backgroundColor : 'white', color:'black'}}
          >
            <option value="">선택</option>
            <option value="판매">판매</option>
            <option value="구매">구매</option>
            <option value="나눔">나눔</option>
            <option value="산책">산책</option>
          </select>
          {errors.carrotTag && (
                    <div className="error">
                        <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
                        {errors.carrotTag}
                    </div>
                )}        
        </div>

        <div className="form-group">
          <label style={{textAlign: 'left'}}>가격</label>
          <input
            type="text"
            id="carrotPrice"
            value={carrotPrice}
            onChange={(event) => {setCarrotPrice(event.target.value); clearError('carrotPrice');}}
            placeholder="￦ 가격을 입력하세요"
            className={errors.carrotPrice ? 'input-error' : ''}
            style={{backgroundColor : 'white', color:'black'}}
          />
          {errors.carrotPrice && (
                    <div className="error">
                        <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
                        {errors.carrotPrice}
                    </div>
                )}        
        </div>

        <div className="form-group">
          <label>이미지</label>
          <ImageUpdate imgList={imgList} setImgList={setImgList} value={imgList}/>
        </div>
        <button type="submit" className="submit-button" >
          작성 완료
        </button>
        <button type="reset" className="submit-button" onClick={() => handleCancel()}>취소</button>
      </form>
    );
};

export default CarrotPostForm;