import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';
import { backendUrlImages } from '../../../constant/config';
import Cardd from '../../CardEvent';
import { Grid } from '@mui/material';

const UpcomingConferences2 = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const BaseUrl = process.env.REACT_APP_BASE_URL;


  useEffect(() => {
    const fetchConferences = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${BaseUrl}/con/upcoming`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConferences(response.data.upcoming_conferences);
        console.log(response.data.upcoming_conferences);
      } catch (error) {
        console.error('Error fetching conferences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  if (loading) return <p>Loading conferences...</p>;

  return (
    <section className={`pricing-section-two ${"alternate"}`} style={{
      marginTop:'10vh'
    }}>
      <div className="sec-title  text-center">
  <h2 style={{ display: 'inline-block', borderBottom: '2px solid #9B1321', paddingBottom: '10px' }}>Upcoming Event
  </h2>
</div>
   
          <div className="anim-icons">
                  <span className="icon icon-line-1"></span>
                  <span className="icon icon-circle-1"></span>
                  <span className="icon icon-dots"></span>
          </div>
          <div className="auto-container"
          style={{
            width:'100%',
            maxWidth:'100%'
          }}
           >
          <div className="outer-box"
          style={{
            width:'100%',
            maxWidth:'100%'

          }}
          >
    <div className="upcoming-conferences-container"
    style={{
      padding:'20px',
    }}
    >
      <Grid container spacing={2} justifyContent="center">
      {conferences.map((conference) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={conference.id}>
          <Cardd
            imageUrl={`${backendUrlImages}${conference?.image}`}
            title={conference.title}
            description={conference.description}
            seeMoreLink={`/conference/details/${conference.id}`}
            galleryLink={conference.galleryLink}
            buttonText="Read More"
           
            galleryButtonText="Explore Gallery"
          />
        </Grid>
      ))}
    </Grid>
    </div>
          </div>
          </div>
          </section>
   
  );
};

export default UpcomingConferences2;
