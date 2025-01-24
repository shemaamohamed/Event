import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import CustomFormWrapper from "../../../CoreComponent/CustomFormWrapper";
import SimpleLabelValue from "../../../components/SimpleLabelValue";
import "./style.scss";
import { Drawer, Grid, IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
const ViewOneTrip = ({ isOpen, setIsOpen, tripId }) => {
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const fetchTripData = async (tripId) => {
    if (!tripId) {
      return;
    }
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const response = await axios.get(`${BaseUrl}/trip/${tripId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });
      setOptions(response.data.trip.additional_options);
      console.log(response.data?.trip);

      setData(response.data?.trip);
    } catch (err) {}
  };
  useEffect(() => {
    tripId && fetchTripData(tripId);
  }, [tripId]);

  if (data && options) {
    return (
      <div className="trip-container-sec">
        <Drawer open={isOpen} onClose={()=>{
          setIsOpen(false);
        }}
        anchor="right"
        sx={{
          //width
          zIndex: (theme) => theme.zIndex.modal + 1, // Ensure it's above modals and other high-priority elements
    
          '& .MuiDrawer-paper': {
              zIndex: (theme) => theme.zIndex.modal + 1,
    
    
        width: 
        {
          xs: '100%',
          sm: '50%',
          md: '40%',
          lg: '30%',
          xl: '30%',
        }, 
      },
    
        }}
        >
            <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 2,
        }}
        >
        <IconButton onClick={() => setIsOpen(false)}>
           <CloseRounded /> 
          </IconButton>

        </div>
          <CustomFormWrapper title="View Trip" setOpenForm={setIsOpen}>
          <Grid container spacing={2} style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
  <Grid item xs={6}>
    <SimpleLabelValue label="Name" value={data?.name} />
  </Grid>
  <Grid item xs={6}>
    <SimpleLabelValue label="Trip Type" value={data?.trip_type} />
  </Grid>
  <Grid item xs={12}>
    <SimpleLabelValue label="Description" value={data?.description} />
  </Grid>
  <Grid item xs={12}>
    <SimpleLabelValue label="Additional Info" value={data?.additional_info} />
  </Grid>

  {data?.trip_type === "private" && (
    <>
      <Grid item xs={6}>
        <SimpleLabelValue label="Price per Person" value={`$${data?.price_per_person}`} />
      </Grid>
      <Grid item xs={6}>
        <SimpleLabelValue label="Price for Two" value={`$${data?.price_for_two}`} />
      </Grid>
      <Grid item xs={6}>
        <SimpleLabelValue label="Price for Three or More" value={`$${data?.price_for_three_or_more}`} />
      </Grid>
      <Grid item xs={6}>
        <SimpleLabelValue
          label="Available Dates"
          value={
            (data?.available_dates &&
              data?.available_dates.split(",").map((item, index) => (
                <div key={index} style={{ marginBottom: '4px' }}> {item} </div>
              ))) ||
            "-"
          }
        />
      </Grid>
    </>
  )}

  <Grid item xs={6}>
    <SimpleLabelValue label="Location" value={data?.location || "-"} />
  </Grid>
  <Grid item xs={6}>
    <SimpleLabelValue label="Duration" value={data?.duration || "-"} />
  </Grid>
  <Grid item xs={6}>
    <SimpleLabelValue label="Inclusions" value={data?.inclusions || "-"} />
  </Grid>

  {data?.trip_type !== "private" && (
    <Grid item xs={6}>
      <SimpleLabelValue label="Group Price per Companion" value={data?.group_accompanying_price || "-"} />
    </Grid>
  )}

  {data?.trip_type === "private" && (
    <Grid item xs={12}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>Additional Options</div>
      {options?.map((item, index) => (
        <Grid container key={index} spacing={2}>
          <Grid item xs={6}>
            <SimpleLabelValue label="Option Name" value={item?.option_name || ""} />
          </Grid>
          <Grid item xs={6}>
            <SimpleLabelValue label="Price" value={item?.price || ""} />
          </Grid>
        </Grid>
      ))}
    </Grid>
  )}
</Grid>

           
            
          </CustomFormWrapper>
        </Drawer>
      </div>
    );
  }
};

export default ViewOneTrip;
