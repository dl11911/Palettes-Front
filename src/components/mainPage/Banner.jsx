// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Slider from "react-slick";
import {Container, Box, Typography, Avatar, Badge, Modal, Button} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "slick-carousel/slick/slick.css";
import "../../styles/mainPage/slider.css";

// eslint-disable-next-line react/prop-types
const NextArrow = ({ onClick }) => {
    return (
        <Button
            className="slick-next"
            onClick={onClick}
            type="slick-next-button"
        >
        </Button>
    );
};

// eslint-disable-next-line react/prop-types
const PrevArrow = ({ onClick }) => {
    return (
        <Button
            className="slick-prev"
            onClick={onClick}
            type="slick-prev-button"
        >
        </Button>
    );
};

export default function Banner() {
    let settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        slidesPerRow: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    const [modal, setModal] = useState(false)

    const openModal = () => setModal(true)

    const closeModal = () => setModal(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Slider {...settings}>
                <div className='reviewSlider'>
                    <Container maxWidth="sm" sx={{mt: 4}}>
                            <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                <Avatar onClick={openModal}
                                    src="https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG"
                                    sx={{width: 48, height: 48, mr: 2}}
                                />
                                <Modal
                                open={modal}
                                onClose={closeModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <img src="https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG" alt="User"/>
                                </Box>
                            </Modal>
                                <Box sx={{flexGrow: 0}}>
                                    <Typography variant="body2" color="text.secondary">
                                        <AccessTimeIcon sx={{verticalAlign: 'middle', mr: 0.5}}/>몇 시간 전
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.primary">
                                        첫번째 후기 글입니다.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography variant="" color="text.secondary"
                                            sx={{display: 'flex', alignItems: 'center', mr: 1}}>
                                    <VisibilityIcon sx={{verticalAlign: 'middle', mr: 0.5}}/>조회수
                                </Typography>
                                <Typography variant="body2" color="text.secondary"
                                            sx={{display: 'flex', alignItems: 'center', mr: 1}}>
                                    <FavoriteBorderIcon sx={{verticalAlign: 'middle', mr: 0.5}}/>좋아요
                                </Typography>
                                <Badge badgeContent={999} color="primary">
                                    <Typography variant="body2" color="text.secondary">댓글</Typography>
                                </Badge>
                            </Box>
                    </Container>
                </div>

                

                <div className={"reviewSlider"}>
                    <Container maxWidth="sm" sx={{mt: 4}}>
                            <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                <Avatar
                                    src="https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG"
                                    sx={{width: 48, height: 48, mr: 2}}
                                />
                                <Box sx={{flexGrow: 0}}>
                                    <Typography variant="body2" color="text.secondary">
                                        <AccessTimeIcon sx={{verticalAlign: 'middle', mr: 0.5}}/>몇 시간 전
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.primary">
                                        세번째 후기 글입니다.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography variant="" color="text.secondary"
                                            sx={{display: 'flex', alignItems: 'center', mr: 1}}>
                                    <VisibilityIcon sx={{verticalAlign: 'middle', mr: 0.5}}/>조회수
                                </Typography>
                                <Typography variant="body2" color="text.secondary"
                                            sx={{display: 'flex', alignItems: 'center', mr: 1}}>
                                    <FavoriteBorderIcon sx={{verticalAlign: 'middle', mr: 0.5}}/>좋아요
                                </Typography>
                                <Badge badgeContent={999} color="primary">
                                    <Typography variant="body2" color="text.secondary">댓글</Typography>
                                </Badge>
                            </Box>
                    </Container>
                </div>
            </Slider>
        </>
    );
}