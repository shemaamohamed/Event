import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
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
           padding: "1rem",
           borderRadius: "12px",
           margin: "0 0.5rem",
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
             src={`https://eventscons.com/backend/storage/app/public/${client.image}`}
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
