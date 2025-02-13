import React, { useEffect, useState } from 'react';
import SingleBannerV1 from './SingleBannerV1';
import Slider from 'react-slick';
import axios from 'axios';
import toast from 'react-hot-toast';
import { HashLink as Link } from 'react-router-hash-link';
import EventsConsultant from "./EventsConsultant.jpg"
import EventsConsultant1 from "./EventsConsultant1.jpg"
import EventsConsultant2 from "./EventsConsultant2.jpg"
import EventsConsultant3 from "./EventsConsultant3.jpg"
import EventsConsultant4 from "./EventsConsultant4.jpg"
import EventsConsultant5 from "./EventsConsultant5.jpg"
import EventsConsultant8 from "./EventsConsultant8.jpg"



const BannerV1 = () => {
    const [allConferences, setAllConferences] = useState([]);
    const getConference = () => {
      const BaseUrl = process.env.REACT_APP_BASE_URL;
      const url = `${BaseUrl}/con/upcoming`;
      const token = localStorage.getItem("token");
  
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAllConferences(response.data.upcoming_conferences);
          console.log(response.data.upcoming_conferences)
        })
        .catch(() => {
          toast.error("Error fetching conferences");
        });
    };
  
    useEffect(() => {
      getConference();
    }, []);
  
    

    const NextArrow = (props) => {
        return <button className="slick-next" onClick={props.onClick}>
            <i className="fa fa-angle-right" />
        </button>;
    };

    const PrevArrow = (props) => {
        return <button className="slick-prev" onClick={props.onClick}>
            <i className="fa fa-angle-left" />
        </button>;
    };

    const settings = {
        infinite: true,
        autoplay: true,
        arrows: true,
        slidesToShow: 1,
        speed: 500,
        slidesToScroll: 1,
        fade: true,
        autoplaySpeed: 5000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }

    return (
        <>
            <section className="banner-section">
                <div className="banner-carousel">
                    <Slider {...settings}>
                    <>
                         <div className="slide-item" style={{ backgroundImage: `url(${EventsConsultant8})` }}>
                                        <div className="auto-container">
                                             <div className="content-box">
                                              
                                                <h2> 
                                                Events Consultant </h2>
                                               
                                            </div> 
                                        </div>
                                    </div >
                        </>
                       
                        <>
                         <div className="slide-item" style={{ backgroundImage: `url(${EventsConsultant1})` }}>
                                        <div className="auto-container">
                                             <div className="content-box">
                                              
                                                <h2> 
                                                Events Consultant </h2>
                                               
                                            </div> 
                                        </div>
                                    </div >
                        </>
                        <>
                         <div className="slide-item" style={{ backgroundImage: `url(${EventsConsultant2})` }}>
                                        <div className="auto-container">
                                             <div className="content-box">
                                              
                                                <h2> 
                                                Events Consultant </h2>
                                               
                                            </div> 
                                        </div>
                                    </div >
                        </>
                        <>
                         <div className="slide-item" style={{ backgroundImage: `url(${EventsConsultant3})` }}>
                                        <div className="auto-container">
                                             <div className="content-box">
                                              
                                                <h2> 
                                                Events Consultant </h2>
                                               
                                            </div> 
                                        </div>
                                    </div >
                        </>
                       
                       
                        <>
                         <div className="slide-item" style={{ backgroundImage: `url(${EventsConsultant})` }}>
                                        <div className="auto-container">
                                             <div className="content-box">
                                              
                                                <h2> 
                                                Events Consultant </h2>
                                               
                                            </div> 
                                        </div>
                                    </div >
                        </>
                        {allConferences.map(banner =>
                            <SingleBannerV1 banner={banner} key={banner.id} />
                        )}
                    </Slider>
                </div>
            </section>
        </>
    );
};

export default BannerV1;