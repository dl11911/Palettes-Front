// eslint-disable-next-line no-unused-vars
import React from 'react';
import AutoSlideImgComp from './AutoSlideImgComp';
import BoardViewStyle from '../../styles/mainPage/boardView.module.css'
import BoardView from './BoardView';
import MainCarrotView from './MainCarrotView';
import MainHotSpotView from './MainHotSpotView';
import Banner from './Banner';
import { Link } from 'react-router-dom';


const BoardViewComp = () => {
    
    return (
        <>
            <AutoSlideImgComp/>
            <br/>            
            <div className={BoardViewStyle.postsSection}>
                <div className={BoardViewStyle.postsHeader}>
                    <span className={BoardViewStyle.postsTitle}>오늘의 인기글</span>
                </div>
                <BoardView/>
            </div>

            <hr></hr>

            <div className={BoardViewStyle.postsSection}>
                <div className={BoardViewStyle.postsHeader}>
                    <span className={BoardViewStyle.postsTitle}>최신 거래글</span>
                </div>
                <MainCarrotView/>
            </div>
            
            <hr></hr>

            {/* <div className={BoardViewStyle.postsSection}>
                <Banner/>
            </div> */}
            <div className={BoardViewStyle.postsSection}>
                <div className={BoardViewStyle.postsHeader}>
                    <span className={BoardViewStyle.postsTitle}>최신 명소</span>
                </div>
                <MainHotSpotView/>
            </div>


        </>
    );
};

export default BoardViewComp;