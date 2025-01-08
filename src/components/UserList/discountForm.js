import React, { useEffect, useState } from "react";
import Input from "../../CoreComponent/Input";
import Select from "../../CoreComponent/Select";
import httpService from "../../common/httpService"; // Import the httpService
import "./style.scss";
import CustomFormWrapper from "../../CoreComponent/CustomFormWrapper";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import toast from "react-hot-toast";
import { Drawer, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CloseRounded } from "@mui/icons-material";


const AddDiscountForm = ({ isOpen, setIsOpen, userId }) => {
  // const [participantId, setParticipantId] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  // const [isDiscountVisible, setIsDiscountVisible] = useState(false);
  const [conferenceOptions, setConferenceOptions] = useState([]);
  const [tripOptions, setTripOptions] = useState([]);
  const [additionalOptions, setAdditionalOptions] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [selectedConferenceId, setSelectedConferenceId] = useState(null);
  const BaseUrl = process.env.REACT_APP_BASE_URL;


  const getAuthToken = () => localStorage.getItem("token");

  const fetchUserConferences = async () => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/user/${userId}/conferences`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });

      const formattedConferences = response.map(({ title, id }) => ({
        label: title,
        value: id,
      }));
      setConferenceOptions(formattedConferences);
    } catch (error) {
      console.error("Error fetching conferences", error);
    }
  };

  const fetchConferenceTrips = async (conferenceId) => {
    if (!conferenceId) return;
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/conference-trips`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      console.log({ response });

      const filteredTrips = response.data.filter(
        ({ conference_id }) => conference_id === conferenceId
      );

      const formattedTrips = filteredTrips.map(({ trip }) => ({
        label: trip.name,
        value: trip.id,
      }));

      setTripOptions(formattedTrips || []);
    } catch (error) {
      console.error("Error fetching trips", error);
    }
  };

  const fetchTripOptions = async (tripId) => {
    if (!selectedConferenceId) return;
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/additional-options/trip/${tripId}`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });

      const formattedOptions = response.data.map(({ option_name, id }) => ({
        label: option_name,
        value: id,
      }));

      setAdditionalOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching options", error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const discountData = {
        user_id: userId,
        option_id: selectedOptionId?.value,
        trip_id: selectedTripId?.value,
        price: discountAmount,
        show_price: true,
      };
      await httpService({
        method: "POST",
        url: `${BaseUrl}/discounts`,
        data: discountData,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        onSuccess: () => {
          setIsOpen(false);
        },
        showLoader: true,
        withToast: true,
      });
    } catch (error) {
      console.error("Error submitting discount", error);
    }
  };

  useEffect(() => {
    if (userId) fetchUserConferences();
  }, [isOpen, userId]);

  useEffect(() => {
    if (selectedConferenceId) fetchConferenceTrips(selectedConferenceId.value);
  }, [selectedConferenceId]);

  useEffect(() => {
    setSelectedTripId(null);
  }, [selectedConferenceId]);

  useEffect(() => {
    setSelectedOptionId(null);
  }, [selectedTripId]);

  useEffect(() => {
    if (selectedTripId?.value) fetchTripOptions(selectedTripId.value);
  }, [selectedTripId]);

  return (
    <Drawer open={isOpen} anchor="right" onClose={() => setIsOpen(false)}
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
      <CustomFormWrapper
        title="Add Discount for User"
        handleSubmit={handleFormSubmit}
        setOpenForm={setIsOpen}
      >
        <form >
          <Select
            options={conferenceOptions}
            value={selectedConferenceId}
            setValue={setSelectedConferenceId}
            label="Conference"
          />
          <Select
            options={tripOptions}
            value={selectedTripId}
            setValue={setSelectedTripId}
            label="Trip"
          />
          <Select
            options={additionalOptions}
            value={selectedOptionId}
            setValue={setSelectedOptionId}
            label="Option"
          />
          <Input
            label="New Value"
            inputValue={discountAmount}
            setInputValue={(value) => setDiscountAmount(parseFloat(value) || 0)}
            placeholder="new value"
            type="number"
          />
          {/* <Select
            options={[
              { value: true, label: "Show Discount" },
              { value: false, label: "Hide Discount" },
            ]}
            value={{
              value: isDiscountVisible,
              label: isDiscountVisible ? "Show" : "Hide",
            }}
            setValue={(option) => setIsDiscountVisible(option.value)}
            label="Show Discount"
          /> */}
        </form>
      </CustomFormWrapper>
    </Drawer>
  );
};

export default AddDiscountForm;
