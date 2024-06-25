import React, { useState } from 'react';
import { differenceInDays, differenceInMonths, differenceInYears, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faDog } from '@fortawesome/free-solid-svg-icons';
import PetStyle from '../styles/petAge.module.css'
import ImgStyle from '../styles/img.module.css'

import Swal from 'sweetalert2';

const PetAgeComp = () => {
    function calculatePetAge(petType, actualAge) {
        let humanAge = 0;

        if (['small', 'medium', 'large'].includes(petType)) {
            if (actualAge <= 2) {
                humanAge = actualAge * ({ 'small': 11, 'medium': 12, 'large': 13 }[petType]);
            } else {
                humanAge = ((actualAge - 2) * 5) + ({ 'small': 22, 'medium': 24, 'large': 26 }[petType]);
            }
        } else if (petType === 'cat') {
            if (actualAge === 1) {
                humanAge = 15;
            } else if (actualAge === 2) {
                humanAge = 24;
            } else {
                humanAge = 24 + ((actualAge - 2) * 4);
            }
        }

        return humanAge;
    }

    function PetAgeForm() {
        const [petType, setPetType] = useState('');
        const [dogSize, setDogSize] = useState('small');
        const [birthDate, setBirthDate] = useState('');
        const [humanAge, setHumanAge] = useState('');
        const [ageDescription, setAgeDescription] = useState('');

        const handleCalculate = () => {
            const currentDate = new Date();
            const birthDateParsed = parseISO(birthDate);
            const daysOld = differenceInDays(currentDate, birthDateParsed);
            const monthsOld = differenceInMonths(currentDate, birthDateParsed);
            const yearsOld = differenceInYears(currentDate, birthDateParsed);

            let description = "";

            if (yearsOld > 0) {
                description += `${yearsOld}년`;
            }
            if (monthsOld % 12 > 0) {
                description += `${monthsOld % 12}개월`;
            }
            
            const actualAge = Math.floor(yearsOld) + Math.floor((monthsOld % 12) / 12);
            const calculatedAge = calculatePetAge(petType === 'dog' ? dogSize : petType, actualAge);
            
            if (description === '')
                Swal.fire({
                    title: '날짜 입력',
                    text: '날짜를 입력하세요.^^',
                    icon: 'warning'
                });
            else{
            setHumanAge(`사람 나이로는 ${calculatedAge}살 입니다.`);
            setAgeDescription(`태어난 지 ${daysOld}일\n${description} 되었습니다.`);
            }

        }

        return (
            <div className={PetStyle.body}>
                <h2>반려동물 나이 계산기</h2>
                <div className={ImgStyle.imageTool}>
                    <img className={ImgStyle.image} src={Age} alt="Age" />
                </div>
                <div className={PetStyle.Check}>
                    <button onClick={() => setPetType('dog')}><FontAwesomeIcon icon={faDog} style={{color: "#ffffff"}} /> 강아지</button>
                    <button onClick={() => setPetType('cat')}><FontAwesomeIcon icon={faCat} style={{color: "#cf7207"}} /> 고양이</button>
                </div>
                {petType === 'dog' && (
                    <div className={PetStyle.Check}>
                        <button onClick={() => setDogSize('small')}>소형견</button>
                        <button onClick={() => setDogSize('medium')}>중형견</button>
                        <button onClick={() => setDogSize('large')}>대형견</button>
                    </div>
                )}
                {petType && (
                    <div className={PetStyle.Check}>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            placeholder="반려동물의 생년월일을 입력하세요"
                        />
                    </div>
                )}
                <br/>
                <button onClick={handleCalculate}>계산하기</button>
                <p>{humanAge}</p>
                <p>
                    {ageDescription.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br/>
                        </span>
                    ))}
                </p>
            </div>
        );
    }

    return <PetAgeForm />;
};

export default PetAgeComp;