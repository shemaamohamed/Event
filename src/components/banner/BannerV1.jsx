import React, { useEffect, useState, useRef } from "react";
import SingleBannerV1 from "./SingleBannerV1";
import Slider from "react-slick";
import axios from "axios";
import toast from "react-hot-toast";
import EventsConsultant1 from "./EventsConsultant1.jpg";
import EventsConsultant2 from "./EventsConsultant2.jpg";
import EventsConsultant3 from "./EventsConsultant3.jpg";
import open from "./open.mp4";

const BannerV1 = () => {
    const [allConferences, setAllConferences] = useState([]);
    const sliderRef = useRef(null);
    const videoRef = useRef(null);
    const [autoplay, setAutoplay] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const getConference = async () => {
            try {
                const BaseUrl = process.env.REACT_APP_BASE_URL;
                const url = `${BaseUrl}/con/upcoming`;
                const token = localStorage.getItem("token");
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllConferences(response.data.upcoming_conferences);
            } catch (error) {
                toast.error("Error fetching conferences");
            }
        };

        getConference();
    }, []);

    useEffect(() => {
        if (currentSlide === 0 && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setAutoplay(false); // يوقف التمرير التلقائي أثناء تشغيل الفيديو
        } else {
            setAutoplay(true); // يستأنف التمرير التلقائي بعد الفيديو
        }
    }, [currentSlide]);

    const handleVideoEnd = () => {
        setTimeout(() => {
            setAutoplay(true);
            if (sliderRef.current) {
                sliderRef.current.slickNext();
            }
        }, 1000); // مهلة قصيرة قبل الانتقال إلى الشريحة التالية
    };

    const settings = {
        infinite: true,
        autoplay: autoplay,
        arrows: true,
        slidesToShow: 1,
        speed: 500,
        slidesToScroll: 1,
        fade: true,
        autoplaySpeed: 5000,
        afterChange: (index) => setCurrentSlide(index),
        nextArrow: (
            <button className="slick-next">
                <i className="fa fa-angle-right" />
            </button>
        ),
        prevArrow: (
            <button className="slick-prev">
                <i className="fa fa-angle-left" />
            </button>
        ),
    };

    return (
        <section className="banner-section">
            <div className="banner-carousel">
                <Slider {...settings} ref={sliderRef}>
                    <div>
                        <video
                            ref={videoRef}
                            muted
                            playsInline
                            onEnded={handleVideoEnd}
                            style={{ width: "100%", height: "90vh", objectFit: "cover" }}
                        >
                            <source src={open} type="video/mp4" />
                        </video>
                    </div>

                    {[EventsConsultant1, EventsConsultant2, EventsConsultant3].map((image, index) => (
                    <>
                     <div key={index} className="slide-item" style={{ backgroundImage: `url(${image})` }}>
                            <div className="auto-container">
                                <div className="content-box">
                                    <h2>Events Consultant</h2>
                                </div>
                            </div>
                        </div>
                    </>
                       
                    ))}

                    {allConferences.map((banner) => (
                        <SingleBannerV1 banner={banner} key={banner.id} />
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default BannerV1;
