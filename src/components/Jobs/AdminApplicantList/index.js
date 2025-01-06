// JobList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ApplicantsList from "./applicants/applicants";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
const JobApplicants= () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [activeJobId, setActiveJobId] = useState(null);
  const BaseUrl = process.env.REACT_APP_BASE_URL;;

const navigate =useNavigate()
  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/all/job`);
        setJobs(response.data.jobs);
      } catch (error) {
        setError("Error fetching jobs: " + (error.response?.data?.message || error.message));
      }
    };

    fetchJobs();
  }, []);
  const viewApplicants = (jobId) => {
    navigate(`/job/applicants/${jobId}`);
  };
  return (
    <div >
      <Typography variant="h4" 
              sx={{
              
                color: '#c62828',
      
                textAlign: 'center',
              }}
      
              textAlign={"center"}
              gutterBottom>
                Available Jobs
              </Typography>
      {error && <p className="error-message">{error}</p>}
      <Grid container spacing={2}
      sx={
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }
      }
      >

      
      {jobs.map((job) => (
        <Grid item xs={12} sm={12} md={8}>
          <Card key={job.id}id sx={{ width:'100%'}}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {job.events_coordinator}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Responsibilities:</strong> {job.responsibilities}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Description:</strong> {job.description}
              </Typography>
              <Button 
              variant="outlined"
              sx={{
                color: "#c62828",
                border: "1px solid #c62828",
                padding: "5px 10px",
                marginTop: "10px",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#c62828",
                  color: "#fff",
                }
                
              }}
              onClick={() => viewApplicants(job.id)} >
                View Applicants
              </Button>
            </CardContent>
          </Card>
          </Grid>
          

        
        
      ))}
      </Grid>

      {activeJobId && <ApplicantsList jobId={activeJobId} />}
    </div>
  );
};

export default JobApplicants;
