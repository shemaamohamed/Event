import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
// import "./style.scss";
import { HashLink as Link } from 'react-router-hash-link'
import { backendUrlImages } from "../../constant/config";


const SelectConferences = () => {
  const [allConferences, setAllConferences] = useState([]);
  const [conferenceName, setConferenceName] = useState("");
  const [type, setType] = useState("");

  const [selectedPriceId, setSelectedPriceId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const currentPath = location.pathname;
  const isAttendance = currentPath === "/registerPage/attendance";
  const getConference = () => {
    const searchQuery = conferenceName
      ? `?search=${encodeURIComponent(conferenceName)}`
      : "";
    const url = `${BaseUrl}/con/upcoming`;

    axios
      .get(url)
      .then((response) => {
        setAllConferences(response.data.upcoming_conferences);
      })
      .catch((error) => {
        console.error("Error fetching conferences", error);
      });
  };

  useEffect(() => {
    getConference();
    console.log(currentPath);
  }, [conferenceName]);

  const handleTitleClick = (conferenceId) => {
    if (isAttendance) return;
    const currentPath = location.pathname;
    const paths = {
      "/registerPage/attendance": `/register/attendance/${conferenceId}`,
      "/registerPage/speaker": `/register/speaker/${conferenceId}`,
      "/registerPage/group": `/register/group/${conferenceId}`,
      "/registerPage/sponsor": `/register/sponsor/${conferenceId}`,
    };
    navigate(paths[currentPath] || currentPath);
  };
  const handleAttendanceClick = (conferenceId, type , priceId) => {
    navigate(`/register/attendance/${conferenceId}/${type}/${priceId}`);
  };

  return (
    <>

    <section className="schedule-section"
    style={{
      marginTop:'10vh'
    }}
    >
      <div className="anim-icons">
      <span className="icon icon-circle-4"
      style={{
        top:'20px',
      }}
      ></span>
      
                        <span className="icon icon-circle-4"></span>
                        <span className="icon icon-circle-3"></span>
                </div>
                
      <div className="auto-container">
        <div className="sec-title text-center">
          <span className="title">Available Conferences</span>
        </div>
        <div className="schedule-tabs tabs-box">
          <div className="tabs-content">
            <div className="schedule-timeline">
              {allConferences?.map((conference, index) => (
                <div
                  className={`schedule-block ${index % 2 === 0 ? 'even' : 'odd'}`}
                  key={conference.id}
                  style={{
                    display: 'flex',
                    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                    marginBottom: '30px',
                  }}
                >
                  <div className="inner-box" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      className="inner"
                      
                    >
                      <div
                        className="date"
                        
                      >
                        {new Date(conference.start_date).toLocaleDateString()}
                      </div>
                      <div className="speaker-info" style={{ marginBottom: '15px' }}>
                      <figure className="thumb"
                      style={{
                        width:'60px',
                        height:'60px'
                      }}
                      ><img  
                      style={{
                        width:'100%',
                        height:"100%"
                      }}
                      src={`${backendUrlImages}${conference.image}`}
                                                          alt={conference.title} /></figure>

                        <h5
                          className="name"
                          style={{
                            fontSize: '18px',
                            color: '#333',
                            fontWeight: 'bold',
                          }}
                        >
                          {conference.title}
                        </h5>
                        {isAttendance && (
                          <ul
                            className="prices-list"
                            style={{ listStyleType: 'none', padding: '0', margin: '0' }}
                          >
                            {conference.prices.map((price) => (
                              <li
                                key={price.id}
                                className={`price-item ${selectedPriceId === price.id ? 'selected' : ''}`}
                                onClick={() => handleAttendanceClick(conference.id, price.price_type , price.id)}
                                style={{
                                  backgroundColor: '#f8f8f8',
                                  padding: '15px',
                                  marginBottom: '10px',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  transition: 'background-color 0.3s ease',
                                }}
                              >
                                <div
                                  className="price-header"
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                  }}
                                >
                                  <div
                                    className="price-type"
                                    style={{
                                      fontWeight: 'bold',
                                      fontSize: '16px',
                                      color: '#333',
                                    }}
                                  >
                                    {price.price_type}
                                  </div>
                                  <div
                                    className="price-amount"
                                    style={{
                                      fontSize: '18px',
                                      fontWeight: 'bold',
                                      color: '#9B1321',
                                    }}
                                  >
                                    ${price.price}
                                  </div>
                                </div>
                                <div
                                  className="price-description"
                                  style={{
                                    fontSize: '14px',
                                    color: '#777',
                                  }}
                                >
                                  {price.description}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {!isAttendance && (
                        <div
                          className="btn-box"
                          onClick={() => handleTitleClick(conference.id)}
                          style={{ marginTop: '20px' }}
                        >
                          <Link
                            className="theme-btn"
                            style={{
                              padding: '10px 20px',
                              borderRadius: '5px',
                              textAlign: 'center',
                              display: 'inline-block',
                              textDecoration: 'none',
                            }}
                          >
                            Register
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>



      {/* <div className="conferences" style={{
      padding:'20px',
      marginTop:'20vh'
    }}>
      <h1 className="title">Available Conferences</h1>
      <ul className="conference-list">
        {allConferences?.map((conference) => (
          <li key={conference.id} className="conference-item">
            <h2 onClick={() => handleTitleClick(conference.id)}>
              {conference.title}
            </h2>
            {isAttendance && (
              <ul className="prices-list">
                {conference.prices.map((price) => (
                  <li
                    key={price.id}
                    className={`price-item ${
                      selectedPriceId === price.id ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleAttendanceClick(conference.id, price.price_type)
                    }
                  >
                    <div className="price-type">{price.price_type}</div>
                    <div className="price-amount">${price.price}</div>
                    <div className="price-description">{price.description}</div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div> */}
</>
  
  );
};

export default SelectConferences;
