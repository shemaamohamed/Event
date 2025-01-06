import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "../../../CoreComponent/Select";

import "./style.scss";
import toast from "react-hot-toast";
import Input from "../../../CoreComponent/Input";
import TextArea from "../../../CoreComponent/TextArea";
import { Button, Grid, Typography } from "@mui/material";

const SponsorshipForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allConference, setAllConference] = useState([]);
  const [conferenceId, setConferenceId] = useState("");
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const token = localStorage.getItem("token");

  // Get upcoming conferences
  const getConference = () => {
    const url = `${BaseUrl}/conferences/all`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllConference(
          response.data.data?.map((item) => ({
            label: item?.title,
            value: item?.id,
          }))
        );
      })
      .catch((error) => {
        toast.error("Error fetching conferences");
        setError("An error occurred while fetching conferences");
      });
  };

  useEffect(() => {
    getConference();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!conferenceId) {
      toast.error("Please select a conference");
      return;
    }
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post(
        `${BaseUrl}/sponsorship-options/${conferenceId.value}`,
        {
          title,
          description,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast.success("Sponsorship option created successfully");
  
      // Reset fields after successful submission
      setTitle("");
      setDescription("");
      setPrice("");
      setConferenceId(""); // Reset selected conference
  
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occurred while submitting the data");
      toast.error("Error submitting data");
    }
  };
  

  return (
    <Grid
  container
  spacing={3}
  sx={{
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    width: { xs: '100%', sm: '95%', md: '90%' }, // Responsive width
    margin: 'auto',
  }}
>
  <Grid item xs={12}>
  <Typography variant="h5" 
        sx={{
          color: '#c62828',
          textAlign: 'center',
        }}
        textAlign={"center"}
        gutterBottom>
        Add Sponsorship Option
      </Typography>
  </Grid>

  <form onSubmit={handleSubmit} style={{ width: '100%' }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <Select
          options={allConference}
          value={conferenceId}
          setValue={setConferenceId}
          label="Conference"
          placeholder="Select..."
          width="100%"
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <Input
          label="Title"
          placeholder="Enter title"
          inputValue={title}
          setInputValue={setTitle}
          required
          width="100%"
        />
      </Grid>

      <Grid item xs={12}>
        <TextArea
          label="Description"
          placeholder="Enter description"
          value={description}
          setValue={setDescription}
          type="text"
          required
          width="100%"
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <Input
          label="Price"
          inputValue={price}
          setInputValue={setPrice}
          placeholder="Enter price"
          required
          width="100%"
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12}
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
      >
        <Button

        sx={{
          backgroundColor: '#c62828',// Modern vibrant red

          marginTop: "20px",
          color: "#fff",
          width: "50%",
          "&:hover": {
            backgroundColor: "#e63946",
            color: "#fff",
          }
        }}
        type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Grid>
    </Grid>
  </form>
</Grid>

   
  );
};

export default SponsorshipForm;
