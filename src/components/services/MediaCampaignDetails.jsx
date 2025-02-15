import { Grid } from '@mui/material';
import React from 'react';
import media from './media.mp4'

const MediaCampaignDetails = () => {
    return (
        <>
            <section className="event-detail">
                <div className="auto-container">
                    <div className="content-box">

                        <h2>Comprehensive Media and Marketing Services</h2>

                        <p>
                            Our dedicated marketing department manages all aspects of publicity and marketing to help you effectively reach potential sponsors, participants, and delegates. Our creative team excels in designing and developing all print materials and oversees the production and distribution of information to your target audience.
                        </p>

                        <Grid container>
                            <Grid item xs={12} md={6}>
                            <h3>Our Media Campaign Services:</h3>

                            <ul className="list-style-two">
                            <li>Conduct a thorough media campaign study.</li>
                            <li>Coordinate all press releases.</li>
                            <li>Organize and manage press conferences.</li>
                            <li>Arrange for all necessary media advertisements.</li>
                            <li>Oversee and control the pressroom during the congress.</li>
                        </ul>

                            </Grid>
                            <Grid item xs={12} md={6} display="flex" >
  <video controls width="100%" height="auto">
    <source src={media} type="video/mp4" />
  </video>
</Grid>

                        </Grid>




                        <h3>Concept Creation:</h3>
                        <ul className="list-style-two">
                            <li>Establishing objectives to creatively design and develop the overall branding and image for meetings and events.</li>
                            <li>Assisting in setting appropriate pricing for the event.</li>
                            <li>Developing sponsorship and exhibition opportunities.</li>
                            <li>Managing the budget and building strategic alliances effectively.</li>
                        </ul>

                    </div>
                </div>
            </section>
        </>
    );
};

export default MediaCampaignDetails;
