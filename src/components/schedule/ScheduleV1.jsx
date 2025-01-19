import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link'
import { Carousel, Button } from 'react-bootstrap';
import { backendUrlImages } from "../../constant/config";


import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ScheduleV1 = () => {
    const [allConferences, setAllConferences] = useState([]);
    const navigate = useNavigate();
    const [selectedConference, setSelectedConference] = useState(null);
   
    
    const handleSelectConference = (conference) => {
        if (selectedConference && selectedConference.id === conference.id) {
          setSelectedConference(null);
        } else {
          setSelectedConference(conference);
        }
      };

  
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
        })
        .catch(() => {
          toast.error("Error fetching conferences");
        });
    };
  
    useEffect(() => {
      getConference();
    }, []);
  
    const handleConferenceClick = (conferenceId) => {
      navigate(`/conference/details/${conferenceId}`);
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
                        <span className="title">About Conference</span>
                        <h2>Upcoming Conferences</h2>
                    </div>
                    <div className="schedule-tabs tabs-box ">
                        <div className="btns-box">
                        <div className="schedule-carousel">
                        <Carousel interval={3000} controls={true} indicators={true}>
                            {allConferences.map((conference) => (
                                <Carousel.Item key={conference.id} onClick={() => handleSelectConference(conference)}>
                                <img
                                    className="d-block w-100"
                                    src={`${backendUrlImages}${conference.image}`}
                                    alt={conference.title}
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                                <Carousel.Caption>
                                    <h3>{conference.title}</h3>
                                    <p>{conference.short_description}</p>
                                </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                    </Carousel>
        </div>
                        </div>
                        <div className="tabs-content">
                          
                                        <div className="schedule-timeline">
                                            {
                                                selectedConference&&(
                                                    <>
                                                     <div className={`schedule-block ${selectedConference.title}`} key={selectedConference.id}>
                                                        <div className="inner-box">
                                                            <div className="inner">
                                                                <div className="date">{new Date(selectedConference.start_date).toLocaleDateString()}</div>
                                                                <div className="speaker-info">
                                                                    {/* <figure className="thumb"><img src={`../images/resource/${block.speakerThumb}`} alt="image" /></figure> */}
                                                                    <h5 className="name">{selectedConference.title
                                                                    }</h5>
                                                                    {/* <span className="designation">{block.designation}</span> */}
                                                                </div>
                                                                {/* <h4><Link to={`/event-detail/${schedule.id}/${block.id}#`}>{block.title}</Link></h4> */}
                                                                <div className="text">{selectedConference.title}</div>
                                                                <div className="btn-box">
                                                                    <Link to={`/conference/details/${selectedConference.id}}#`} className="theme-btn">Read More</Link>
                                                                </div>
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

export default ScheduleV1;