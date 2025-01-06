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
    <div className="view-one-trip-for-user">
      {tripData?.image_1 && (
        <div className="slider">
          <img
            src={`${backendUrlImages}${tripData.image_1}`}
            alt="Trip Image 1"
          />
        </div>
      )}

      <div className="trip-name-section">
        {tripData?.name && <h1>{tripData?.name}</h1>}

        {tripData?.description && (
          <div className="info-header">{tripData?.description}</div>
        )}

        {(tripData?.price_per_person > 0  ||
          tripData?.price_for_two >0 ||
          tripData?.price_for_three_or_more > 0) &&  (
          <>
            <h3>Price Information</h3>
            <div className="additional-options-container">
              {tripData?.price_per_person && (
                <SimpleLabelValue
                  label="Price per person"
                  value={` ${tripData?.price_per_person}$`}
                />
              )}
              {tripData?.price_for_two && (
                <SimpleLabelValue
                  label="Price for two"
                  value={` ${tripData?.price_for_two}$`}
                />
              )}
              {tripData?.price_for_three_or_more && (
                <SimpleLabelValue
                  label="Price for three or more"
                  value={` ${tripData?.price_for_three_or_more}$`}
                />
              )}
            </div>
          </>
        )}

        {tripData?.additional_options?.length > 0 && (
          <>
            <h3>Additional Options</h3>
            <div className="additional-options-container">
              {tripData?.additional_options?.map((item) => (
                <div key={item?.option_name}>
                  <SimpleLabelValue
                    label={item?.option_name}
                    value={`${item?.price}$`}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {tripData?.trip_type && (
          <SimpleLabelValue label="Trip Type" value={tripData?.trip_type} />
        )}
        {tripData?.trip_type === "group" && tripData?.available_dates && (
          <SimpleLabelValue
            label="Available Dates"
            value={tripData?.available_dates}
          />
        )}
        {tripData?.location && (
          <SimpleLabelValue label="Location" value={tripData?.location} />
        )}
        {tripData?.duration && (
          <SimpleLabelValue
            label="Duration"
            value={`${tripData?.duration} days`}
          />
        )}
        {tripData?.inclusions && (
          <SimpleLabelValue label="Inclusions" value={tripData?.inclusions} />
        )}
        {tripData?.group_price_per_person && (
          <SimpleLabelValue
            label="Group Price per person"
            value={`${tripData?.group_price_per_person}$`}
          />
        )}
        {tripData?.group_price_per_speaker && (
          <SimpleLabelValue
            label="Group Price per speaker"
            value={`${tripData?.group_price_per_speaker}$`}
          />
        )}
        {tripData?.trip_details && (
          <SimpleLabelValue
            label="Trip Details"
            value={tripData?.trip_details}
          />
        )}
{(tripData?.trip_type === "group" && (tripData?.group_accompanying_price ?? 0) > 0) ? (
  <SimpleLabelValue
    label="Group Accompanying Price"
    value={`${tripData?.group_accompanying_price}$`}
  />
) : null}



        <button
          className="register-trip-btn"
          onClick={() => {
            if (tripData?.trip_type === "group") {
              setIsDialogOpen(true);
              // navigate(`/group-trip/user/${id}`);
            } else {
              navigate(`/trip/user/${id}`);
            }
          }}
        >
          Register now
        </button>
      </div>
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
    </div>
  );
};

export default ViewOneTripUser;
