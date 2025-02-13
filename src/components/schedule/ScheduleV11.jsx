import React, { useEffect, useState } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { backendUrlImages } from "../../constant/config";
import httpService from "../../common/httpService";
import { useNavigate } from "react-router-dom";


const ScheduleV11 = () => {
    const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState([]);
    const [selectedExhibitions, setSelectedExhibitions] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchExhibitions = async () => {
    try {
      const  data  = await httpService({
        method: "GET",
        url: `${BASE_URL}/exhibitions/new`,
       
      });
      setExhibitions(data);
      console.log(exhibitions);

     
      setError(null);
    } catch (err) {
      console.error("Failed to fetch exhibitions:", err);
      setError("Unable to load exhibitions. Please try again later.");
    }
  };

  useEffect(() => {
    fetchExhibitions();
  }, []);
     
      
      const handleSelectExhibitions= (exhibition) => {
          if (selectedExhibitions && selectedExhibitions.id === exhibition.id) {
            setSelectedExhibitions(null);
          } else {
            setSelectedExhibitions(exhibition);
          }
        };



    return (
        <>
            <section className="schedule-section">
                <div className="anim-icons">
                        <span className="icon icon-circle-4"></span>
                        <span className="icon icon-circle-3"></span>
                </div>
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <span className="title">Up Coming Exhibitions</span>
                    </div>
                    <div className="schedule-tabs tabs-box ">
                        <div className="btns-box">
                        <div className="schedule-carousel">
                        <Carousel interval={3000} controls={true} indicators={true}>
                            {exhibitions.map((exhibition) => (
                                <Carousel.Item key={exhibition.id} onClick={() => handleSelectExhibitions(exhibition)}>
                                <img
                                    className="d-block w-100"
                                    src={`${backendUrlImages}${exhibition.image}`}
                                    alt={exhibition.title}
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                                <Carousel.Caption>
                                    <h3>{exhibition.title}</h3>
                                    <p>{exhibition.short_description}</p>
                                </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                    </Carousel>
        </div>
                        </div>
                        <div className="tabs-content">
                          
                                        <div className="schedule-timeline">
                                            {
                                                selectedExhibitions&&(
                                                    <>
                                                     <div className={`schedule-block ${selectedExhibitions.title}`} key={selectedExhibitions.id}>
                                                        <div className="inner-box">
                                                            <div className="inner">
                                                                <div className="date">{new Date(selectedExhibitions.start_date).toLocaleDateString()}</div>
                                                                <div className="speaker-info">
                                                                    {/* <figure className="thumb"><img src={`../images/resource/${block.speakerThumb}`} alt="image" /></figure> */}
                                                                    <h5 className="name">{selectedExhibitions.title
                                                                    }</h5>
                                                                    {/* <span className="designation">{block.designation}</span> */}
                                                                </div>
                                                                {/* <h4><Link to={`/event-detail/${schedule.id}/${block.id}#`}>{block.title}</Link></h4> */}
                                                                <div className="text">{selectedExhibitions.title}</div>
                                                                {/* <div className="btn-box">
                                                                    <Link to={`/conference/details/${selectedConference.id}}#`} className="theme-btn">Read More</Link>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </>
                                                )
                                            }
                                          
                                                   
                                                
                                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ScheduleV11;