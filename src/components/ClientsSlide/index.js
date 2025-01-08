import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from "axios";




const ClientsSlide = () => {
  const [clients, setClients] = useState([]); // حالة لتخزين العملاء
  const BaseUrl = process.env.REACT_APP_BASE_URL;;

  useEffect(() => {
    const fetchClients = () => {
      axios.get(`${BaseUrl}/clients`)
        .then(response => {
          console.log(response.data);
          setClients(response.data); 
        })
        .catch(error => {
          console.error('Error fetching clients:', error.response ? error.response.data : error.message);
        });
    };

    fetchClients(); 
  }, []); 
  

  return (
    <div style={{ padding: "1rem" }}>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid
          size={{
            xs: 12,
          }}
          
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: '#c82333',
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
                textShadow: '0px 4px 8px rgba(0, 0, 0, 0.7)',
              }}
            >
              {/* OurClients */}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        loop={true}
        slidesPerView="auto"
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={5000}
        breakpoints={{
          768: {
            slidesPerView: 4,
          },
          480: {
            slidesPerView: 2,
          },
        }}
        style={{
          padding: "1rem",
          height:'40vh',
        }}
      >
        {clients.map((client, i) => (
          <SwiperSlide
            key={i}
            style={{
              width: "100px !important",
              height: "100px !important",
              padding: "1rem",
              borderRadius: "12px",
              margin: "0 0.5rem",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              transition: "transform 0.3s ease-in-out",
              cursor: "grab",
            }}
          >
            <div>
              <img
                src={`https://mayazin.co/backend/storage/app/public/${client.image}`}
                alt={`Company Logo ${i + 1}`}
                style={{
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
                width={200}
                height={200}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ClientsSlide;
