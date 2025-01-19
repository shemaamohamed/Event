import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';
import { backendUrlImages } from '../../../constant/config';
import Cardd from '../../CardEvent';
import { Grid } from '@mui/material';

const UpcomingConferences2 = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const BaseUrl = 'https://panel.mayazin.co/api';

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
    <div className="upcoming-conferences-container"
    style={{
      padding:'20px',
    marginTop:'15vh'
    }}
    >
      <h2 className="section-title">Upcoming Event</h2>
      <Grid container spacing={4} justifyContent="center">
      {conferences.map((conference) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={conference.id}>
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
  );
};

export default UpcomingConferences2;
