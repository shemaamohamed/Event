import React, { Fragment, useState, useEffect } from "react";
import Input from "../../../CoreComponent/Input/index";
import Checkbox from "../../../CoreComponent/Checkbox/index";
import DateInput from "../../../CoreComponent/Date/index";
import ImageUpload from "../../../CoreComponent/ImageUpload";
import SVG from "react-inlinesvg";
import deleteIcon from "../../../icons/deleteIcon.svg";
import { useFlightStepper } from "../StepperContext";
import toast from "react-hot-toast";
import httpService from "../../../common/httpService";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import DialogMessage from "../../DialogMessage";

const CompanionInformation = () => {
  const navigate = useNavigate();
  const initialValue = {
    name: "",
    arrivalDate: "",
    departureDate: "",
    passportImage: null,
    departureAirport: "",
    returnAirport: "",
    specificFlightTime: false,
    flightTime: "",
    flightNumber: "",
    seatNumber: "",
    otherRequests: "",
    upgradeClass: false,
  };
  const { mode } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const {
    arrivalDate,
    departureDate,
    passportImage,
    departureAirport,
    returnAirport,
    specificFlightTime,
    flightTime,
    flightNumber,
    otherRequests,
    seatNumber,
    upgradeClass,
    ticketCount,
    companions,
    setCompanions,
    flight_id,
    setFlight_id,
  } = useFlightStepper();

  const handleCompanionChange = (index, field, value) => {
    setCompanions((prevCompanions) => {
      const updatedCompanions = [...prevCompanions];
      updatedCompanions[index][field] = value;
      return updatedCompanions;
    });
  };

  const addNewCompanion = () => {
    setCompanions([...companions, { ...initialValue }]);
  };

  const deleteCompanion = (index) => {
    setCompanions(companions.filter((_, i) => i !== index));
  };

  const formatFlightData = (flights) => {
    return flights.map((flight, index) => {
      let main_user_id;
      if (index !== 0) {
        main_user_id = flight_id;
      } else {
        main_user_id = null;
      }
      return {
        main_user_id: main_user_id,
        flight_id: flight?.flight_id || null,
        departureAirport: flight.departureAirport,
        returnAirport: flight.returnAirport,
        departureDate: flight.departureDate,
        arrivalDate: flight.arrivalDate,
        specificFlightTime: flight.specificFlightTime
          ? flight.flightTime
          : null,
        flightNumber: flight.flightNumber || 0,
        seatNumber: flight.seatNumber || 0,
        upgradeClass: flight.upgradeClass ? 1 : 0,
        otherRequests: flight.otherRequests || null,
        ticket_count: flight.ticketCount || 1,
        name: flight.name || "i",
        passportImage: flight.passportImage || null,
      };
    });
  };

  const getAuthToken = () => localStorage.getItem("token");

  const formatFlightDataToFormData = (flights) => {
    const formData = new FormData();
    flights.forEach((flight, index) => {
      for (const [key, value] of Object.entries(flight)) {
        const fieldKey = `flights[${index}][${key}]`;
        formData.append(fieldKey, value || "");
      }
    });
    return formData;
  };
  const submitFlightData = async (flightDataArray) => {
    const formattedData = formatFlightData(flightDataArray);
    const formData = formatFlightDataToFormData(formattedData);

    const res = await httpService({
      method: "POST",
      url: mode === "edit" ? `${BaseUrl}/edit/flight` : `${BaseUrl}/flights`,
      headers: { Authorization: `Bearer ${getAuthToken()}` },
      data: formData,
      // onSuccess: () => {
      //   setIsDialogOpen(true);
      // },
      // onError: () => {},
      // withToast: false,
      // showLoader: true,
    });
    console.log({ res });
    if (res?.message == "You cannot modify the flight as the admin update deadline has passed.") {
      toast.error(res.message);
      navigate("/flight/form")
    } else {
      setIsDialogOpen(true);

    }

  };

  const handleSubmit = () => {
    const flightDetails = {
      flight_id,
      arrivalDate,
      departureDate,
      passportImage,
      departureAirport,
      returnAirport,
      specificFlightTime,
      flightTime,
      flightNumber,
      otherRequests,
      seatNumber,
      upgradeClass,
      ticketCount,
    };
    const data = [
      { ...flightDetails, passportImage: passportImage },
      ...companions,
    ];
    submitFlightData(data);
  };
  const isCompanionFormValid = (companion) => {
    return (
      companion.name &&
      companion.arrivalDate &&
      companion.departureDate &&
      companion.passportImage &&
      companion.departureAirport &&
      companion.returnAirport
    );
  };

  const isSubmitDisabled = companions.some(
    (companion) => !isCompanionFormValid(companion)
  );

  return (
    <div className="flight-test">
      <DialogMessage
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        message={`Thank You, the admin will soon enter available trip options for you. Once the trips are added, you will be notified to choose your preferred flight. Thank you for your patience!`}
        onOk={() => {
          setIsDialogOpen(false);
          navigate("/flight/form");
        }}
        onClose={() => {
          setIsDialogOpen(false);
          navigate("/flight/form");
        }}
      />
      <div className="add-flight-btn-container">
        <button type="button" onClick={addNewCompanion}>
          Add Companion
        </button>
      </div>
      <div className="flight-form-container">
        {companions.map((companion, index) => (
          <div className="flight-form-stepper-container" key={index}>
            <div className="delete-icon-container">
              <SVG
                className="delete-icon"
                src={deleteIcon}
                onClick={() => deleteCompanion(index)}
              />
            </div>
            <form className="flight-form-stepper">
              <Input
                label="Name"
                type="text"
                inputValue={companion.name}
                setInputValue={(value) =>
                  handleCompanionChange(index, "name", value)
                }
                placeholder="Name"
                required
              />
              <DateInput
                label="Arrival Date"
                inputValue={companion.arrivalDate}
                setInputValue={(value) =>
                  handleCompanionChange(index, "arrivalDate", value)
                }
                placeholder="Arrival Date"
                required
              />
              <DateInput
                label="Departure Date"
                inputValue={companion.departureDate}
                setInputValue={(value) =>
                  handleCompanionChange(index, "departureDate", value)
                }
                placeholder="Departure Date"
                required
              />
              <ImageUpload
                errorMsg=""
                required
                label="Passport Image"
                allowedExtensions={["jpg", "jpeg", "png", "gif"]}
                inputValue={companion.passportImage}
                setInputValue={(value) =>
                  handleCompanionChange(index, "passportImage", value)
                }
              />
              <Input
                label="Departure Airport"
                type="text"
                inputValue={companion.departureAirport}
                setInputValue={(value) =>
                  handleCompanionChange(index, "departureAirport", value)
                }
                placeholder="Departure Airport"
                required
              />
              <Input
                label="Return Airport"
                type="text"
                inputValue={companion.returnAirport}
                setInputValue={(value) =>
                  handleCompanionChange(index, "returnAirport", value)
                }
                placeholder="Return Airport"
                required
              />
              <Checkbox
                label="Do you have specific flight time?"
                checkboxValue={companion.specificFlightTime}
                setCheckboxValue={(value) =>
                  handleCompanionChange(index, "specificFlightTime", value)
                }
                icon=""
                errorMsg=""
              />
              {companion.specificFlightTime && (
                <Fragment>
                  <Input
                    label="Flight Time"
                    type="time"
                    inputValue={companion.flightTime}
                    setInputValue={(value) =>
                      handleCompanionChange(index, "flightTime", value)
                    }
                    placeholder="Flight Time"
                    required
                  />
                  <Input
                    label="Flight Number"
                    type="text"
                    inputValue={companion.flightNumber}
                    setInputValue={(value) =>
                      handleCompanionChange(index, "flightNumber", value)
                    }
                    placeholder="Flight Number"
                    required
                  />
                </Fragment>
              )}
              <Input
                label="Seat Number"
                type="text"
                inputValue={companion.seatNumber}
                setInputValue={(value) =>
                  handleCompanionChange(index, "seatNumber", value)
                }
                placeholder="Seat Number"
              />
              <Input
                label="Other Requests"
                type="text"
                inputValue={companion.otherRequests}
                setInputValue={(value) =>
                  handleCompanionChange(index, "otherRequests", value)
                }
                placeholder="Other Requests"
              />
              <Checkbox
                label="Do you want to upgrade from economy to business class?"
                checkboxValue={companion.upgradeClass}
                setCheckboxValue={(value) =>
                  handleCompanionChange(index, "upgradeClass", value)
                }
                icon=""
                errorMsg=""
              />
            </form>
          </div>
        ))}
      </div>
      <div className="actions-section">
        <button
          className={`next-button ${isSubmitDisabled ? "disabled" : ""}`}
          onClick={() => {
            handleSubmit();
          }}
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CompanionInformation;
