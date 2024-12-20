import React from 'react';
import {  Navigation, Pagination , Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { backendUrlImages } from "../../constant/config";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material';


const CustomSlider = ({data ,handleConferenceClick}) => {
    const getSwiperHeight = () => {
        const width = window.innerWidth;
        if (width < 768) return '20vh'; 
        if (width < 1024) return '40vh'; 
        if (width < 1440) return '80vh'; 
        return '60vh'; 
      };
      


  return (
    <Container>
        <Swiper
            style={{
              '--swiper-navigation-color': '#c82333',
              '--swiper-navigation-size': '30px',
              '--swiper-pagination-color': '#c82333',
              width: '100%',
              height: getSwiperHeight(),
              margin: '20px auto',
            }}
            modules={[ Navigation, Pagination, Autoplay]}
            centeredSlides={true}
            pagination={{
                type: 'bullets',
                clickable: true,

              }}
           
            
            autoplay={{
              delay: 2000, 
              disableOnInteraction: false,
            }}
            slidesPerView={1}
           spaceBetween={10}
        
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,

          },
          '@1.00': {
            slidesPerView: 2,
            spaceBetween: 40,

          },
          '@1.50': {
            slidesPerView: 2,
            spaceBetween: 50,

          },
        }}

          >
            {data.map((slideContent, index) => (
              <SwiperSlide
                key={index} 
                virtualIndex={index}
                style={{
                  textAlign: 'center',
                  fontSize: '18px',
                  background: '#fff',
            
                }}
              >
                <Card
                onClick={() => handleConferenceClick(slideContent.id)}
                 sx={{
                        width: '100%',
                        height: '90%',
                        marginBottom: '20px',
                        transition: '0.3s ease-in-out' ,
                        boxShadow: '3',
                        '&:hover': { boxShadow: '6' ,
                            transform   : 'scale(1.02)',
                        },
                    }}>
                    <CardMedia
                    alt={slideContent.title}
                    sx={{
                        width: '100%',
                        height: '80%',
                    }}
                        image={`${backendUrlImages}${slideContent.image}`}
                        
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {slideContent.title}
                        </Typography>
                        
                    </CardContent>
                    
                    </Card>

             
              </SwiperSlide>
            ))}
          </Swiper>

    </Container>
   
          
      
  );
}
export default CustomSlider;
