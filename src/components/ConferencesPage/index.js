import { useNavigate } from "react-router-dom";
import "./style.scss";
import React, { useEffect, useState } from "react";
import httpService from "../../common/httpService";
import { backendUrlImages } from "../../constant/config";
import Pagination from "../../CoreComponent/Pagination";
import { Card, CardContent, Grid ,CardMedia } from "@mui/material";

const ConferenceCards = ({ conferences }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/conference/details/${id}`);
  };

  return (
    <>
      {conferences.map((conference) => (
         <Grid item xs={12} sm={12} md={6}  lg={3}
        
         >
            <Card
          key={conference.id}
          onClick={() => handleCardClick(conference.id)}
          sx={{
            flex:1,
            height:'100%',
            cursor:'pointer',

           }}

        >
          <CardMedia
                    onClick={() => handleCardClick(conference.id)}

          
          style={{
            width:'100%',
            height:'250px',
            cursor:'pointer',

          }}
          >
            {conference.image ? (
              <img
                src={`${backendUrlImages}${conference.image}`}
                alt={conference.title}
                style={{
                  width:'100%',
                  height:'100%'

                }}
              />
            ) : (
              <div className="conference-placeholder">No Image</div>
            )}
          </CardMedia>
          <CardContent>
            <h3 className="conference-card-title">{conference.title}</h3>
            <p className="conference-card-description">
              {conference.description
                ? conference.description.slice(0, 100) + "..."
                : "No description available"}
            </p>
            <p className="conference-card-dates">
              {new Date(conference.start_date).toLocaleDateString()} -{" "}
              {conference.end_date
                ? new Date(conference.end_date).toLocaleDateString()
                : "TBD"}
            </p>
            <p className="conference-card-location">
              {conference.location || "Location not specified"}
            </p>
          </CardContent>
        </Card>
        
         </Grid>
      
      ))}
    </>
  );
};

const ConferencesPage = () => {
  const [conferences, setConferences] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
  });

  // Fetch conferences whenever the currentPage changes
  useEffect(() => {
    httpService({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/con`,
      params: { page: pagination.currentPage, per_page: 10 },
      onSuccess: (response) => {
        setConferences(response.data || []);
        console.log(response);
        setPagination({
          currentPage: response?.current_page,
          totalPages: response?.total_pages, // Assuming total_pages exists in the response
        });
      },
      onError: (error) => console.error("Error fetching conferences:", error),
    });
  }, [pagination.currentPage]); // Dependency on currentPage

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <section className={`pricing-section-two ${"alternate"}`} style={{
      marginTop:'10vh'
    }}>
      <div className="sec-title  text-center">
  <h2 style={{ display: 'inline-block', borderBottom: '2px solid #9B1321', paddingBottom: '10px' }}>Conferences
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
          <Grid container spacing={3} style={{
      padding:'20px',
   
    }}>
      <ConferenceCards conferences={conferences} />


      <Grid item xs={12}>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
        
        </Grid>
      
    </Grid>
          </div>
          </div>
          </section>
    
    
  );
};

export default ConferencesPage;
