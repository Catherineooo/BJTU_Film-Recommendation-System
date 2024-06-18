import React from "react";
import './backdrop.css';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

const Backdrop = ({ popularMovies }) => {

    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                effect="fade"
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="mySwiper"
            >
                {popularMovies.slice(0, 5).map(movie =>
                    <SwiperSlide key={movie.id}>
                        <img className='backdrop-img' src={movie ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : 'https://placehold.co/500x750.png'} alt='backdrop' />
                    </SwiperSlide>
                )}
            </Swiper>
            {/*<div className='backdrop-section'>
                <img className='backdrop-img' src={popularMovies[0] ? `https://image.tmdb.org/t/p/original/${popularMovies[0].backdrop_path}` : 'https://placehold.co/500x750.png'} alt='backdrop' />
            </div> */}
        </>
    );
};

export default Backdrop;