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
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const Backdrop = ({ popularMovies }) => {

    if (!popularMovies[0]) return <Loader />;

    console.log(popularMovies[0])

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
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
                <SwiperSlide>
                    <Link to={`/movie/${popularMovies[0].id}/movie`} className="backdrop-link">
                        <img className='backdrop-img' src={popularMovies[0] ? `https://image.tmdb.org/t/p/original/${popularMovies[0].backdrop_path}` : 'https://placehold.co/500x750.png'} alt='backdrop' />
                        <div className="backdrop-title">{popularMovies[0].title}</div>
                    </Link>
                </SwiperSlide>
                {popularMovies.slice(1, 5).map(movie =>
                    <SwiperSlide key={movie.id}>
                        <Link to={`/movie/${movie.id}/movie`} className="backdrop-link">
                            <img className='backdrop-img' src={movie ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : 'https://placehold.co/500x750.png'} alt='backdrop' />
                            <div className="backdrop-title">{movie.title}</div>
                        </Link>
                    </SwiperSlide>
                )}
            </Swiper>
        </>
    );
};

export default Backdrop;