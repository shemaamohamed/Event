import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Card, CardMedia, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./style.scss"; // رابط ملف Sass
import httpService from "../../common/httpService";
import { backendUrlImages } from "../../constant/config";

const EditWelcomeMessage = () => {
  const { conferenceId } = useParams();
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [info, setInfo] = useState(null);
  const [editedMessage, setEditedMessage] = useState("");
  const [presidentImage, setPresidentImage] = useState(null);
  const [conferenceLogo, setConferenceLogo] = useState(null);
  const [cooperatingLogo, setCooperatingLogo] = useState(null);

  const getWelcomeData = async () => {
    const getAuthToken = () => localStorage.getItem("token");

    try {
      await httpService({
        method: "GET",
        url: `${BaseUrl}/conferences/${conferenceId}/welcome-message`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: true,
        onSuccess: (data) => {
          setInfo(data);
          setEditedMessage(data.welcome_message);
        }
      });
    } catch (error) {
      console.error("Error fetching welcome message data:", error);
    }
  };

  const handleUpdate = async () => {
    const getAuthToken = () => localStorage.getItem("token");
    const formData = new FormData();

    // إذا لم يتم إدخال رسالة جديدة، أضف الرسالة القديمة
    formData.append("welcome_message", editedMessage || info.welcome_message);

    // إذا تم إدخال صورة جديدة، أضفها، وإلا أضف الصورة القديمة
    formData.append("president_image", presidentImage || info.president_image);

    // إذا تم إدخال شعار جديد، أضفه، وإلا أضف الشعار القديم
    formData.append("conference_logo", conferenceLogo || info.conference_logo);

    // إذا تم إدخال شعار الجمعيات المتعاونة جديد، أضفه، وإلا أضف القديم إذا كان موجود
    if (cooperatingLogo || info.cooperating_associations_logo) {
      formData.append("cooperating_associations_logo", cooperatingLogo || info.cooperating_associations_logo);
    }

    try {
      await httpService({
        method: "POST",  // استخدم PUT لتحديث البيانات
        url: `${BaseUrl}/conferences/${conferenceId}/welcome-message`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        data: formData,
        showLoader: true,
        onSuccess: () => {
          toast.success("Welcome message updated successfully!");
          getWelcomeData(); // إعادة تحميل البيانات بعد التحديث
        },
        onError: (error) => {
          toast.error("Failed to update welcome message.");
        }
      });
    } catch (error) {
      console.error("Error updating welcome message:", error);
      toast.error("An error occurred while updating.");
    }
  };

  useEffect(() => {
    getWelcomeData();
  }, []);

  if (!info) return <div>Loading...</div>;

  return (
    <Box className="edit-welcome-msg-container">
      <Typography variant="h4" gutterBottom className="header-title">
        Edit Welcome Message
      </Typography>

      <Box className="current-data">
        <Typography variant="h6" className="section-title">Current Welcome Message</Typography>

        <Card className="message-card">
          <CardContent>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card className="image-card">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPresidentImage(e.target.files[0])}
          />
          <CardMedia
            component="img"
            image={presidentImage ? URL.createObjectURL(presidentImage) : `${backendUrlImages}conference_images/${info.president_image}`}
            alt="President Image"
          />
        </Card>

        <Card className="image-card">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setConferenceLogo(e.target.files[0])}
          />
          <CardMedia
            component="img"
            image={conferenceLogo ? URL.createObjectURL(conferenceLogo) : `${backendUrlImages}conference_logos/${info.conference_logo}`}
            alt="Conference Logo"
          />
        </Card>

        {info.cooperating_associations_logo && (
          <Card className="image-card">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCooperatingLogo(e.target.files[0])}
            />
            <CardMedia
              component="img"
              image={cooperatingLogo ? URL.createObjectURL(cooperatingLogo) : `${backendUrlImages}cooperating_associations_logo/${info.cooperating_associations_logo}`}
              alt="Cooperating Associations Logo"
            />
          </Card>
        )}
      </Box>

      <Box className="button-container">
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default EditWelcomeMessage;
