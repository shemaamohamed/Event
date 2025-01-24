import React, { useEffect, useState } from "react";
import httpService from "../../../common/httpService";
import ImageUpload from "../../../CoreComponent/ImageUpload";
import "./style.scss";
import TextArea from "../../../CoreComponent/TextArea";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ConferenceWelcomeMessageForm = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [presidentImage, setPresidentImage] = useState(null);
  const [conferenceLogo, setConferenceLogo] = useState(null);
  const [cooperatingLogo, setCooperatingLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();

  const getAuthToken = () => localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    if (welcomeMessage) formData.append("welcome_message", welcomeMessage);
    if (presidentImage) formData.append("president_image", presidentImage);
    if (conferenceLogo) formData.append("conference_logo", conferenceLogo);
    if (cooperatingLogo)
      formData.append("cooperating_associations_logo", cooperatingLogo);

    try {
      await httpService({
        method: "POST",
        url: `${BaseUrl}/conferences/${id}/welcome-message`,  // التصحيح هنا
        data: formData,
        headers: { Authorization: `Bearer ${getAuthToken()}` },  // التصحيح هنا
      });
      toast.success("Welcome message created successfully");
      getData();

    } catch (error) {
      toast.error("Failed to create welcome message. Please try again.");
      setError(error?.response?.data?.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const data = await httpService({
        method: "GET",
        url: `${BaseUrl}/conferences/${id}/welcome-message`,  // التصحيح هنا
        headers: { Authorization: `Bearer ${getAuthToken()}` },  // التصحيح هنا
      });

      if (data) {
        setWelcomeMessage(data.welcome_message || "");
        setPresidentImage(data.president_image || null);
        setConferenceLogo(data.conference_logo || null);
        setCooperatingLogo(data.cooperating_associations_logo || null);
      }
    } catch (error) {
      // يمكن إضافة إدارة الأخطاء هنا
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="container88">
      <h1
      style={{
        color:'#9B1321'
      }}
      >Create Conference Welcome Message</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <TextArea
            className="textarea-field"
            label="Welcome Message"
            placeholder="Enter welcome message"
            value={welcomeMessage}
            setValue={setWelcomeMessage}
            required
            rows={15}
          />
        </div>
        <div className="form-group">
          <ImageUpload
            label="President Image"
            inputValue={presidentImage}
            setInputValue={setPresidentImage}
            allowedExtensions={["jpg", "jpeg", "png"]}
            required
          />
        </div>
        <div className="form-group">
          <ImageUpload
            label="Conference Logo"
            inputValue={conferenceLogo}
            setInputValue={setConferenceLogo}
            allowedExtensions={["jpg", "jpeg", "png"]}
            required
          />
        </div>
        <div className="form-group">
          <ImageUpload
            label="Cooperating Associations Logo"
            inputValue={cooperatingLogo}
            setInputValue={setCooperatingLogo}
            allowedExtensions={["jpg", "jpeg", "png"]}
            required
          />
        </div>
        <button 
        style={{
          backgroundColor:'#9B1321'  
        }}
        type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ConferenceWelcomeMessageForm;
