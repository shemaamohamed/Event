import React, { useEffect, useState } from "react";
import "./style.scss";
import httpService from "../../../../common/httpService";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrlImages } from "../../../../constant/config";
import SimpleLabelValue from "../../../SimpleLabelValue";
import toast from "react-hot-toast";
import axios from "axios";
import Input from "../../../../CoreComponent/Input";
import Dialog from "../../../../CoreComponent/Dialog";
import Select from "../../../../CoreComponent/Select";
import { Button, Grid, Typography } from "@mui/material";

const GroupTripRegistration = ({ availableDates, setIsDialogOpen }) => {
  console.log({ availableDates });
  function convertStringToObjects(input) {
    return input.split(",").map((date) => ({
      label: date,
      value: date,
    }));
  }

  const dates = convertStringToObjects(availableDates);

  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState("2024-12-10");
  const [companionsCount, setCompanionsCount] = useState();
  const [totalPrice, setTotalPrice] = useState(null);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const token = localStorage.getItem("token");
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BaseUrl}/group-trip-participants`,
        {
          trip_id: id,
          selected_date: selectedDate?.value,
          companions_count: companionsCount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalPrice(response.data.participant.total_price);
      setSubmitted(true);
      toast.success("register successfully!");
      setIsDialogOpen(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "حدث خطأ في الطلب");
      } else {
        setError("حدث خطأ في الاتصال بالخادم");
      }
    }
  };

  return (
    <div className="registration-container">
      <h2>Group Trip Registration</h2>

      {submitted ? (
        <div className="result">
          <h3>Total Price: {totalPrice} $</h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group9">
            <Select
              options={dates}
              value={selectedDate}
              setValue={setSelectedDate}
              label="Selected Date"
              placeholder="Select..."
            />
            <Input
              label={"Companions Count"}
              type="number"
              inputValue={companionsCount}
              setInputValue={setCompanionsCount}
            />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

const ViewOneTripUser = () => {
  const { id } = useParams();
  const [tripData, setTripData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const getAuthToken = () => localStorage.getItem("token");
  const navigate = useNavigate();
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const getTripById = async () => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/trip_option/${id}`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: true,
      });

      setTripData(response?.trip);
    } catch (error) {
      console.error("Error submitting discount", error);
    }
  };

  useEffect(() => {
    getTripById();
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems={"center"}
    sx={{
      padding: "20px",
    }}
    > 
     {tripData?.image_1 && (
          <Grid item xs={12} md={5}>
            <div className="slider">
              <img
                src={`${backendUrlImages}${tripData.image_1}`}
                alt="Trip Image 1"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </div>
          </Grid>
      )}
      <Grid item xs={12} md={7}>
      {tripData?.name && (
          <Grid item xs={12}>
            <Typography variant="h4" textAlign={'center'} gutterBottom padding={2}>
              {tripData?.name}
            </Typography>
          </Grid>
        )}

        {tripData?.description && (
          <Grid item xs={12} padding={1}>
            <Typography variant="body1" color="textSecondary">
              {tripData?.description}
            </Typography>
          </Grid>
        )}

        {(tripData?.price_per_person > 0 ||
          tripData?.price_for_two > 0 ||
          tripData?.price_for_three_or_more > 0) && (
          <>
            <Grid item xs={12}>
              <Typography variant="h6" padding={1}>Price Information</Typography>
            </Grid>
            <Grid item xs={12} container spacing={2}
            padding={2}
            >
              {tripData?.price_per_person && (
                <Grid item xs={12} sm={6}>
                  <SimpleLabelValue
                    label="Price per person"
                    value={`$${tripData?.price_per_person}`}
                  />
                </Grid>
              )}
              {tripData?.price_for_two && (
                <Grid item xs={12} sm={6}>
                  <SimpleLabelValue
                    label="Price for two"
                    value={`$${tripData?.price_for_two}`}
                  />
                </Grid>
              )}
              {tripData?.price_for_three_or_more && (
                <Grid item xs={12} sm={6}>
                  <SimpleLabelValue
                    label="Price for three or more"
                    value={`$${tripData?.price_for_three_or_more}`}
                  />
                </Grid>
              )}
            </Grid>
          </>
        )}

        {tripData?.additional_options?.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="h6" padding={1}>Additional Options</Typography>
            </Grid>
            <Grid item xs={12} container spacing={2}
                        padding={2}

            >
              {tripData?.additional_options?.map((item) => (
                <Grid item xs={12} sm={6} key={item?.option_name}>
                  <SimpleLabelValue
                    label={item?.option_name}
                    value={`$${item?.price}`}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        <Grid container spacing={2} justifyContent="center" alignItems={"center"} padding={2}>
        {tripData?.trip_type && (
          <Grid item xs={12} sm={6}>
            <SimpleLabelValue label="Trip Type" value={tripData?.trip_type} />
          </Grid>
        )}
         {tripData?.location && (
          <Grid item xs={12 } sm={6}>
            <SimpleLabelValue label="Location" value={tripData?.location} />
          </Grid>
        )}
          {tripData?.inclusions && (
          <Grid item xs={12} sm={6}>
            <SimpleLabelValue label="Inclusions" value={tripData?.inclusions} />
          </Grid>
        )}

        {tripData?.group_price_per_person && (
          <Grid item xs={12} sm={6}>
            <SimpleLabelValue
              label="Group Price per person"
              value={`$${tripData?.group_price_per_person}`}
            />
          </Grid>
        )}

        {tripData?.group_price_per_speaker && (
          <Grid item xs={12} sm={6}>
            <SimpleLabelValue
              label="Group Price per speaker"
              value={`$${tripData?.group_price_per_speaker}`}
            />
          </Grid>
        )}
        
        {tripData?.duration && (
          <Grid item xs={12} sm={6}>
            <SimpleLabelValue label="Duration" value={`${tripData?.duration} days`} />
          </Grid>
        )}

      

        {tripData?.trip_details && (
          <Grid item xs={12} >
            <SimpleLabelValue
              label="Trip Details"
              value={tripData?.trip_details}
            />
          </Grid>
        )}

        {tripData?.trip_type === 'group' && tripData?.available_dates && (
          <Grid item xs={12} sm={6}>
            <SimpleLabelValue
              label="Available Dates"
              value={tripData?.available_dates}
            />
          </Grid>
        )}

       


        {tripData?.trip_type === 'group' && (tripData?.group_accompanying_price ?? 0) > 0 && (
          <Grid item xs={12} sm={6}>
            <SimpleLabelValue
              label="Group Accompanying Price"
              value={`$${tripData?.group_accompanying_price}`}
            />
          </Grid>
        )}
          </Grid>

      
         <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className="register-trip-btn"
            onClick={() => {
              if (tripData?.trip_type === 'group') {
                setIsDialogOpen(true);
                // navigate(`/group-trip/user/${id}`);
              } else {
                navigate(`/trip/user/${id}`);
              }
            }}
             sx={{
                                  color: "white",
                                  cursor: "pointer",
                                  backgroundColor: "#c62828",
                                  "&:hover": {
                                    backgroundColor: "#dc143c",
                                  },
                                }}
            fullWidth
          >
            Register now
          </Button>
        </Grid>
        </Grid>

       

       

      <Dialog
        viewHeader={true}
        header=""
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
      >
        <div className="dialog-message">
          <GroupTripRegistration
            id={id}
            availableDates={tripData?.available_dates}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </Dialog>
    </Grid>
  );
};

export default ViewOneTripUser;
