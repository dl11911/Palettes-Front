import React, { useState } from 'react';
import { putOther } from '../../service/memberApi'; // putOther 함수의 경로를 맞춰주세요

const SettingOtherComp = () => {
  const [formData, setFormData] = useState({
    birth: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putOther(formData);
      console.log('Response:', response);
      alert('성별과 생일이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Error:', error);
      alert('성별과 생일 입력 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>성별과 생일 입력</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gender">성별:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <label>
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === 'M'}
                onChange={handleChange}
                required
              />
              남성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === 'F'}
                onChange={handleChange}
                required
              />
              여성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="O"
                checked={formData.gender === 'O'}
                onChange={handleChange}
                required
              />
              기타
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="birth">생일:</label>
          <input
            type="date"
            name="birth"
            id="birth"
            value={formData.birth}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default SettingOtherComp;
