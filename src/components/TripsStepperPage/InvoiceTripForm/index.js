import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SimpleLabelValue from "../../../components/SimpleLabelValue";
import { Grid, Typography, Button } from '@mui/material'
import {

  getFromLocalStorage,
  saveToLocalStorage,
} from "../../../common/localStorage";
import httpService from "../../../common/httpService";
import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import { useTripsStepper } from "../StepperContext";

const InvoiceTripForm = ({total,setTotal , id,setId}) => {
  const { currentStep, completeStep, invoice, setInvoice } = useTripsStepper();
  const navigate = useNavigate();
  const { tripId } = useParams();
  const participantsData = getFromLocalStorage("participants") || [];
  const additionalOptionsData = getFromLocalStorage("AdditionalOptionsData");
  const accommodationData = getFromLocalStorage("AccommodationData");
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const handleSubmit = () => {
    completeStep(currentStep);

    const token = localStorage.getItem("token");
    const participantsList = participantsData?.map((item) => {
      return {
        ...item,
        nationality: item?.nationality?.value,
        include_accommodation: item?.include_accommodation?.value,
        is_companion: true,
      };
    });
    const speakerData = { ...accommodationData, is_companion: false };
    const addtionalOptionsBody = additionalOptionsData.map((item) => item?.id);

    const body = {
      trip_id: tripId,
      options: addtionalOptionsBody,
      participants: [speakerData, ...participantsList],
    };

    axios
      .post(`${BaseUrl}/trip-participants`, body, {
        headers: {
          Authorization: `Bearer ${token}`, // إضافة التوكن هنا
          "Content-Type": "application/json", // تحديد نوع المحتوى
        },
      })
      .then((response) => {
        const invoiceIds = response.data?.invoice.map((item) => {
          return item.participant_id;
        });
        setInvoice(response.data?.invoice);
        console.log(invoice);
        setTotal(response.data?.total_price)
        setId(response.data?.invoice_id)
        saveToLocalStorage("invoiceIds", invoiceIds);
        setTimeout(() => {
          completeStep(currentStep);
        }, [1000]);

        toast.success("The data was updated successfully!");
      })
      .catch((error) => {
        setInvoice([]);
        toast.error("User is already registered in this trip");
        navigate("/view-user-trips");
      });
  };

  return (
    <div >
    {accommodationData && (
      <div>
        <Typography variant="h6" className="header-invoice-trips" gutterBottom  >
          Accommodation Details
        </Typography>
  
        <Grid container spacing={2} className="accommodation-data-container">
          <Grid item xs={12} sm={6} >
            <SimpleLabelValue label="Check-in Date" value={accommodationData.check_in_date} />
          </Grid>
          <Grid item xs={12} sm={6} >
            <SimpleLabelValue label="Check-out Date" value={accommodationData.check_out_date} />
          </Grid>
          <Grid item xs={12} sm={6} >
            <SimpleLabelValue label="Accommodation Stars" value={accommodationData.accommodation_stars} />
          </Grid>
          <Grid item xs={12} sm={6} >
            <SimpleLabelValue label="Nights Count" value={accommodationData.nights_count} />
          </Grid>
        </Grid>
      </div>
    )}
  
    {participantsData.length > 0 && (
      <div >
        {participantsData.map((participant, index) => (
          <div key={participant.id}>
            <Typography variant="h6" className="header-invoice-trips" gutterBottom >
              Participants {index + 1}
            </Typography>
            <Grid container spacing={2} className="participant-section">
              <Grid item xs={12} sm={6}>
                <SimpleLabelValue label="Name" value={participant.name} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleLabelValue label="Nationality" value={participant.nationality.label} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleLabelValue label="Phone Number" value={participant.phone_number} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleLabelValue label="WhatsApp Number" value={participant.whatsapp_number} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleLabelValue label="Is Companion" value={participant.is_companion ? "Yes" : "No"} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleLabelValue label="Include Accommodation" value={participant.include_accommodation.label} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleLabelValue label="Accommodation Stars" value={participant.accommodation_stars} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleLabelValue label="Nights Count" value={participant.nights_count} />
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    )}
  
    <div className="actions-section">
      <Button
        variant="contained"
        sx={{
          marginTop: "20px",
          backgroundColor:'#cc0000',
          width: '100%',
        }}
        
        className="next-button"
        onClick={handleSubmit}
        fullWidth
      >
        Next
      </Button>
    </div>
  </div>
  );
};

export default InvoiceTripForm;
