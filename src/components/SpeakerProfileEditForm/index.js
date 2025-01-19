import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Checkbox from "../../CoreComponent/Checkbox";
import ImageUpload from "../../CoreComponent/ImageUpload";
import httpService from "../../common/httpService";
import { backendUrlImages } from "../../constant/config";
import { useAuth } from "../../common/AuthContext";
import { useNavigate } from "react-router-dom";
import DateInput from "../../CoreComponent/Date";
import Topics from "./topic.js";
import "./style.scss";
import { Button, Grid, Typography } from "@mui/material";

const SpeakerProfileForm = () => {
  const { speakerData, registrationType } = useAuth();
  const [online, setOnline] = useState(null);
  const [video, setVideo] = useState(null);
  const [formFiles, setFormFiles] = useState({
    image: null,
    abstract: null,
    presentationFile: null,
  });

  const [attendanceOptions, setAttendanceOptions] = useState({
    showOnlineOption: false,
    inPerson: false,
    onlineParticipation: false,
  });

  const [topics, setTopics] = useState([]);
  const [profileDetails, setProfileDetails] = useState({
    userName: "",
    userImage: "",
    userBio: "",
  });
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const navigate = useNavigate();
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const initializeProfileDetails = useCallback(() => {
    if (registrationType === "speaker") {
      setProfileDetails({
        userName: speakerData?.speaker?.name,
        userImage: speakerData?.speaker?.image,
        userBio: speakerData?.speaker?.biography,
      });
    }
  }, [registrationType, speakerData]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (formFiles.abstract) {
      formData.append("abstract", formFiles.abstract);
    }

    if (formFiles.presentationFile) {
      formData.append("presentation_file", formFiles.presentationFile);
    }

    formData.append("topics", JSON.stringify(topics || [])); // Fallback to empty array if topics are null
    formData.append(
      "online_participation",
      attendanceOptions.onlineParticipation ? 1 : 0
    );

    if (departureDate) {
      formData.append("departure_date", departureDate);
    }

    if (arrivalDate) {
      formData.append("arrival_date", arrivalDate);
    }

    if (video) {
      formData.append("video", video);
    }

    try {
      const token = localStorage.getItem("token");
      await httpService({
        method: "POST",
        url: `${BaseUrl}/speakers/user/update`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
        showLoader: true, // Show a loader during the request
      });
      toast.success("Profile Uploaded Successfully");
    } catch (error) {
      // Handle error
    }
  };

  const toggleAttendanceOptions = useCallback(() => {
    setAttendanceOptions((prev) => ({
      ...prev,
      onlineParticipation: prev.inPerson ? false : prev.onlineParticipation,
      inPerson: prev.onlineParticipation ? false : prev.inPerson,
    }));
  }, []);

  const handleTopicChange = (index, newValue) => {
    setTopics((prev) =>
      prev.map((topic, i) => (i === index ? newValue : topic))
    );
  };

  const handleRemoveTopic = (index) => {
    setTopics((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddTopic = () => {
    setTopics((prev) => [...prev, ""]);
  };

  const handleFileChange = (key) => (file) => {
    setFormFiles((prev) => ({ ...prev, [key]: file }));
  };

  const getSpeakerData = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${BaseUrl}/speakers/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const topics = JSON.parse(response.data.speaker.topics || "[]");
      setTopics(topics);
      setFormFiles({
        abstract: response?.data?.speaker?.abstract,
        image: response?.data?.speaker?.image,
        presentationFile: response?.data?.speaker?.presentation_file,
      });
      setArrivalDate(response?.data?.speaker?.arrival_date);
      setDepartureDate(response?.data?.speaker?.departure_date);
      setVideo(response?.data?.speaker?.video);
      setOnline(response?.data?.speaker?.is_online_approved);

      setAttendanceOptions({
        showOnlineOption: response?.data?.speaker?.is_online_approved,
        inPerson: !response?.data?.speaker?.online_participation,
        onlineParticipation: response?.data?.speaker?.online_participation,
      });
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getSpeakerData();
  }, []);
  useEffect(() => {
    toggleAttendanceOptions();
  }, [attendanceOptions.inPerson, attendanceOptions.onlineParticipation]);
  useEffect(() => {
    initializeProfileDetails();
  }, [initializeProfileDetails]);

  return (
    <div className="speaker-section-container">
      <div className="speaker-profile-section-container">
        <form onSubmit={handleUpdate} className="speaker-profile-form">
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ textAlign: 'center' }}>
              <img
                src={`${backendUrlImages}${profileDetails.userImage}`}
                alt="User Profile"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  marginRight: '1rem',
                  objectFit: 'cover',
                  border: '2px solid #ef233c',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{
                  color: '#c62828',
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2rem' },
                  textAlign: 'center',
                }}
              >
                {profileDetails.userName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{
                  whiteSpace: 'normal',
                  wordWrap: 'break-word'
                }}
                component="div"
              >
                {profileDetails.userBio}
              </Typography>
            </Grid>
          </Grid>

          <div className="profile-files" style={{ overflow: 'hidden' }}>
            <ImageUpload
              required
              label="Abstract"
              allowedExtensions={["txt", "pdf", "doc", "docx"]}
              inputValue={formFiles.abstract}
              setInputValue={handleFileChange("abstract")}
              className="image-upload"
              placeholder="Abstract"
            />
            <ImageUpload
              required
              label="Presentation File"
              allowedExtensions={["ppt", "pptx"]}
              inputValue={formFiles.presentationFile}
              setInputValue={handleFileChange("presentationFile")}
              className="image-upload"
              placeholder="Presentation File"
            />
            <ImageUpload
              required
              label="Video"
              allowedExtensions={["ppt", "pptx", "mp4"]}
              inputValue={video}
              setInputValue={setVideo}
              className="image-upload"
              placeholder="Video"
            />

            <DateInput
              label="Arrival Date"
              inputValue={arrivalDate}
              setInputValue={setArrivalDate}
              type="date"
            />
            <DateInput
              label="Departure Date"
              inputValue={departureDate}
              setInputValue={setDepartureDate}
              type="date"
            />

            {online && (
              <div className="attendance-option">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}
                >
                  How would you like to attend the conference?
                </Typography>
                <div className="attendance-checkboxes">
                  <Checkbox
                    label="In-Person"
                    checkboxValue={attendanceOptions.inPerson}
                    setCheckboxValue={(value) =>
                      setAttendanceOptions((prev) => ({
                        ...prev,
                        inPerson: value,
                      }))
                    }
                    className="attendance-checkbox"
                  />
                  <Checkbox
                    label="Online"
                    checkboxValue={attendanceOptions.onlineParticipation}
                    setCheckboxValue={(value) =>
                      setAttendanceOptions((prev) => ({
                        ...prev,
                        onlineParticipation: value,
                      }))
                    }
                    className="attendance-checkbox"
                  />
                </div>
                {attendanceOptions.onlineParticipation && (
                  <Typography
                    sx={{ textAlign: 'center', color: '#555', marginTop: 2 }}
                  >
                    You will be provided with the Zoom link one day before the event.
                  </Typography>
                )}
              </div>
            )}
            <Topics
              topics={topics}
              handleTopicChange={handleTopicChange}
              handleRemoveTopic={handleRemoveTopic}
              handleAddTopic={handleAddTopic}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
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
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SpeakerProfileForm;
