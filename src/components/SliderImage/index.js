import React, { useRef} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// Import required modules
import { Autoplay, Pagination ,Navigation } from 'swiper/modules';
import { Typography, Button } from '@mui/material';

const SliderImage = ({ images }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const swiperRef = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const onSlideChange = (swiper) => {
    const currentSlide = images[swiper.activeIndex];
    const delay = currentSlide.type === 'video' ? 10000 : 3000; 
    swiper.params.autoplay.delay = delay;
    swiper.autoplay.start(); 
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        style={{
          '--swiper-navigation-color': '#c82333',
          '--swiper-navigation-size': '30px',
          '--swiper-pagination-color': '#c82333',
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          type: 'bullets',

        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onSlideChange={onSlideChange}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            {image.type === 'video' ? (
              <video
                src={image.src}
                width="100%"
                height="100%"
                autoPlay
                muted
                loop
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <img
                src={image.src}
                width="100%"
                height="100%"
                alt={`Slide ${index + 1}`}
                style={{ objectFit: 'cover'}}
              />
            )}
            <Typography
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: { xs: '5px 3px', sm: '10px 15px' },
                borderRadius: '10px',
                fontSize: { xs: '8vw', sm: '3vw', md: '2.2vw' },
                fontWeight: '400',
                fontFamily: 'Roboto, sans-serif',
                letterSpacing: '1px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                transition: 'font-size 0.3s ease-in-out',
              }}
            >
              {index === 0 ? (
                <Typography
                  sx={{
                    fontSize: { xs: '8vw', sm: '5vw', md: '4vw' },
                  }}
                >
                  <span style={{ color: '#c82333' }}>E</span>vents
                  <span style={{ color: 'gray' }}>Consultant</span>
                </Typography>
              ) : (
                image.content || `Slide ${index + 1}`
              )}
              {index !== 0 && image.link && (
                <>
                  <br />
                  <Button
                    variant="contained"
                    component="a"
                    href={image.to}
                    sx={{
                      marginTop: '15px',
                      backgroundColor: '#c82333',
                      '&:hover': {
                        backgroundColor: '#e74c3c',
                      },
                      padding: '8px 16px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      textTransform: 'none',
                    }}
                  >
                    {image.link}
                  </Button>
                </>
              )}
            </Typography>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span style={{ color: 'white' }} ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default SliderImage;
