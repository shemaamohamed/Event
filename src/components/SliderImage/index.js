import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const SliderImage = ({ images }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [videoDuration, setVideoDuration] = useState(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const handleVideoLoad = (event) => {
    setVideoDuration(event.target.duration);
  };

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
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            {image.includes('.mp4') ? (
              <video
                src={image}
                width="100%"
                height="100%"
                autoPlay
                loop
                muted
                onLoadedMetadata={handleVideoLoad}
                style={{ objectFit: 'cover', borderRadius: '10px' }}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={image}
                width="100%"
                height="100%"
                alt={`Slide ${index + 1}`}
                onLoad={() => setVideoDuration(null)}
                style={{ objectFit: 'cover', borderRadius: '10px' }}
              />
            )}
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}>
            {videoDuration ? `${Math.ceil(videoDuration)}s` : null}
          </span>
        </div>
      </Swiper>
    </>
  );
};

export default SliderImage;
