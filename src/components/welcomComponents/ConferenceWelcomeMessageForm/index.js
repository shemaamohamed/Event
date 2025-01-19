import React, { useState } from "react";
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
  const getAuthToken = () => localStorage.getItem("token");
  const { id } = useParams()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("welcome_message", welcomeMessage);
    formData.append("president_image", presidentImage);
    formData.append("conference_logo", conferenceLogo);
    formData.append("cooperating_associations_logo", cooperatingLogo);

    const data = {
      method: "POST",
      url: `${BaseUrl}/conferences/${id}/welcome-message`,
      data: formData,
      headers: { Authorization: `Bearer ${getAuthToken()}` },

      showLoader: true,
      withToast: true,
      onSuccess: (response) => {
        toast.success("Welcome message created successfully");

        // Resetting form state after success
        setWelcomeMessage("");
        setPresidentImage(null);
        setConferenceLogo(null);
        setCooperatingLogo(null);
      },
      onError: (errMsg) => {
        toast.error("A welcome message for this conference already exists.");
        setError(errMsg || "A welcome message for this conference already exists.");
      },
    };

    try {
      await httpService(data);
    } catch (err) {
      setError("Error creating welcome message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container88">
      <h1>Create Conference Welcome Message</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <TextArea
            className="textarea-field"
            label="Welcome Message"
            placeholder="Welcome Message"
            value={welcomeMessage}
            setValue={setWelcomeMessage}
            required={true}
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
        <div className="form-group"></div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ConferenceWelcomeMessageForm;
