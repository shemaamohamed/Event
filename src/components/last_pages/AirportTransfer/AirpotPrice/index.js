import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../../../CoreComponent/Input";

import toast from "react-hot-toast";
import "./style.scss";
import httpService from "../../../../common/httpService";
import { Button, Drawer, IconButton, Typography } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

const AirportTransferPrice = ({ isOpen, setIsOpen, selectedConference }) => {
  const [fromAirportPrice, setFromAirportPrice] = useState("");
  const [toAirportPrice, setToAirportPrice] = useState("");
  const [roundTripPrice, setRoundTripPrice] = useState("");
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  // Function to get Authorization token
  const getAuthToken = () => localStorage.getItem("token");

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const prices = {
      conference_id: selectedConference?.id,
      from_airport_price: parseFloat(fromAirportPrice),
      to_airport_price: parseFloat(toAirportPrice),
      round_trip_price: parseFloat(roundTripPrice),
    };

    const token = getAuthToken();

    try {
      const response = await axios.post(
        `${BaseUrl}/airport-transfer-prices`,
        prices,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsOpen(false);
      toast.success("Airport Transfer Price Added successfully!");
    } catch (error) {
      toast.error("Failed to submit prices. Please try again.");
    }
  };

  // Function to fetch the airport prices
  const fetchData = async () => {
    if (!selectedConference?.id) return;
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/test/${selectedConference?.id}`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: false,
      });

      if (response.success && response.data.length > 0) {
        const priceData = response.data[0];
        setFromAirportPrice(priceData.from_airport_price);
        setToAirportPrice(priceData.to_airport_price);
        setRoundTripPrice(priceData.round_trip_price);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset the form values when the side drawer opens
      setFromAirportPrice("");
      setToAirportPrice("");
      setRoundTripPrice("");
    } else {
      fetchData(); // Fetch data only if the drawer is closed
    }
  }, [selectedConference, isOpen, BaseUrl]);

  return (
      <Drawer 
      open={isOpen}
      onClose={() => setIsOpen(false)}
      anchor="right"
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: "100%", md: "40%" },
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,  0,0.1)",
        },
    
      }}
      >
          <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 2,
      }}
    >
      <IconButton onClick={() => setIsOpen(false)}>
        <CloseRounded />
      </IconButton>
    </div>
    
    <Typography variant="h6"  gutterBottom
        sx={{
          color: "#c62828",
          textAlign: "center",
          backgroundColor: "#f1f1f1",
          padding: 1,
          borderRadius: 1,
          marginBottom: 2,
        }}
        >
         Airport Transfer Price
        </Typography>

        
        
          <form onSubmit={handleSubmit} className="price-airport-form9">
            <Input
              label="From Airport Price (USD)"
              inputValue={fromAirportPrice}
              setInputValue={setFromAirportPrice}
              placeholder="Enter price"
              type="number"
              step="0.01"
              required
            />
            <Input
              label="To Airport Price (USD)"
              inputValue={toAirportPrice}
              setInputValue={setToAirportPrice}
              placeholder="Enter price"
              type="number"
              step="0.01"
              required
            />
            <Input
              label="Round Trip Price (USD) "
              inputValue={roundTripPrice}
              setInputValue={setRoundTripPrice}
              placeholder="Enter price"
              type="number"
              step="0.01"
              required
            />
            
          <Button
            type="submit"
            variant="contained"

            onClick={handleSubmit ? handleSubmit : null}
            sx={{
              backgroundColor: '#c62828',

              marginTop: "20px",
              color: "#fff",
              width: "100%",
              "&:hover": {
                backgroundColor: "#e63946",
                color: "#fff",
              }
            }}
          >
            Submit
          </Button>
          </form>
      </Drawer>
  );
};

export default AirportTransferPrice;
