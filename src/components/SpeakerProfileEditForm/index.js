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
import Input from "../../CoreComponent/Input/index.js";

const SpeakerProfileForm = () => {
  const { speakerData, registrationType } = useAuth();
  const [online, setOnline] = useState(null);
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

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
  const [abstract2, setAbstract2] = useState(null);
  const [video2, setVideo2] = useState(null);
  const [presentationFile2, setPresentationFile2] = useState(null);

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
    if (image) {
      formData.append("image", image);
    }

    if (bio
    ) {
      formData.append("biography", bio);
    }
    if (formFiles.presentationFile) {
      formData.append("presentation_file", formFiles.presentationFile);
    }

    formData.append("topics", JSON.stringify(topics || [])); // Fallback to empty array if topics are null
    formData.append(
      "online_participation",
      attendanceOptions.onlineParticipation ? 1 : 0
    );
      formData.append("second_abstract", abstract2);
  
 
      formData.append("second_video", video2);
      
    
    if (departureDate) {
      formData.append("departure_date", departureDate);
    }
    if (presentationFile2) {
      formData.append("second_presentation_file", presentationFile2);
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
      console.log({hedaya : response});
      setImage( `${backendUrlImages}${response?.data?.speaker?.image}`)
      setBio( response?.data?.speaker?.biography
      )
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
      setVideo2(response?.data?.speaker?.second_video);
      setAbstract2(response?.data?.speaker?.second_abstract);

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
                src={profileDetails?.userImage ? `${backendUrlImages}${profileDetails.userImage}` : "data:image/jpeg;base64,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"}
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
          {/* <ImageUpload
                label="Upload Image"
                inputValue={image}
                setInputValue={setImage}
                allowedExtensions={["jpg", "jpeg", "png"]}
              /> */}
              <Input className="input-field"
                label="Bio"
                placeholder="Bio"
                inputValue={bio}
                setInputValue={setBio}
              />
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
  label="Upload Abstract 2"
  setInputValue={setAbstract2}
  inputValue={abstract2}
  allowedExtensions={["txt", "pdf", "doc", "docx"]}

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
              label="Second Presentation File"
              allowedExtensions={["ppt", "pptx"]}
              inputValue={presentationFile2}
              setInputValue={setPresentationFile2}
              className="image-upload"
              placeholder="Second Presentation File"
            />
            <ImageUpload
              required
              label="Video"
              allowedExtensions={["mp4"]}
              inputValue={video}
              setInputValue={setVideo}
              className="image-upload"
              placeholder="Video"
            />

<ImageUpload
  label="Upload Video 2"
  setInputValue={setVideo2}
  inputValue={video2}
  allowedExtensions={["mp4"]}

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
