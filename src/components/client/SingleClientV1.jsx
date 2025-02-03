import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {  Navigation, Pagination , Autoplay} from 'swiper/modules';


const SingleClientV1 = ({ clients }) => {
    
    
      return (
        <div className="sponsors-outer" style={{ width: '100%', margin: '0 auto' }}>
     
      <Swiper
      modules={[Autoplay]}
              spaceBetween={1}
              pagination={{
                clickable: true,
              }}
              slidesPerView={1}
              loop={false}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              speed={1000}
      style={{
        height:'30vh'

      }}
        
       
      breakpoints={{
        768: {
          slidesPerView: 4,
        },
        480: {
          slidesPerView: 2,
        },
      }}
     
      >
        {clients.map((client, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: "30px !important",
              height: "30px !important",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              transition: "transform 0.3s ease-in-out",
              cursor: "grab",
            }}
          >
            <img
              src={`https://mayazin.co/backend/storage/app/public/${client.image}`}
              alt={`Logo ${index}`}
              style={{
                objectFit: "contain",
                width:'50%'
              }}
              width={30}
              height={30}
            />
          </SwiperSlide>
        ))}
      </Swiper>
        
        </div>
      );
};

export default SingleClientV1;